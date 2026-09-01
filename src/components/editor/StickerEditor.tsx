import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { PageRoute, StickerCategory, StickerTemplate, ClipartItem, CanvasElement } from '../../types/sticker';
import { STICKER_TEMPLATES, CLIPART_ELEMENTS } from '../../data/templatesData';
import { 
  renderDieCutStickerBorder, 
  removeBackgroundLocally, 
  downloadCanvasAsPNG, 
  downloadCanvasAsPrintPDF,
  copyCanvasToClipboard 
} from '../../utils/canvasHelper';
import { subscribeFontLoad, loadGoogleFont } from '../../utils/fontLoader';
import { isUrduFontFamily, hasRtlCharacters } from '../../data/fontsData';
import { TemplateSidebar } from './TemplateSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { FloatingToolbar } from './FloatingToolbar';
import { BgRemovalModal } from './BgRemovalModal';
import { 
  Download, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ShoppingBag, 
  ArrowLeft, 
  Menu, 
  X, 
  Check,
  Copy,
  Scissors,
  Sparkles,
  Type,
  Image as ImageIcon,
  Shapes,
  Layers,
  Package
} from 'lucide-react';

interface StickerEditorProps {
  initialCategory?: StickerCategory;
  initialTemplateId?: string;
  onNavigate: (route: PageRoute) => void;
}

type MobilePanel = 'dieCut' | 'templates' | 'text' | 'uploads' | 'clipart' | 'pack' | 'inspect' | null;

// Transform handle types
type TransformHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'rot' | 'body' | null;

const STORAGE_KEY = 'stickermaker_editor_state_v1';

export const StickerEditor: React.FC<StickerEditorProps> = ({ 
  initialCategory, 
  initialTemplateId, 
  onNavigate 
}) => {
  // Active left sidebar tab & single shared mobile panel state so only one panel can be open at a time
  const [activeTab, setActiveTab] = useState<'border' | 'ai' | 'templates' | 'text' | 'uploads' | 'elements' | 'pack'>('border');
  const [activeMobilePanel, setActiveMobilePanel] = useState<MobilePanel>(null);
  const [mobileSheetHeight, setMobileSheetHeight] = useState<number>(62);
  const mobileSheetDragRef = useRef<{ startY: number; startHeight: number } | null>(null);

  // Canvas dimensions & presets
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number; name: string }>({
    width: 600,
    height: 600,
    name: 'Square (600x600)',
  });

  // Die-cut border settings
  const [borderWidth, setBorderWidth] = useState<number>(8);
  const [borderColor, setBorderColor] = useState<string>('#FFFFFF');
  const [hasShadow, setHasShadow] = useState<boolean>(true);
  const [previewBg, setPreviewBg] = useState<'checkerboard' | 'dark' | 'mint' | 'peach'>('checkerboard');

  // Canvas elements state
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [history, setHistory] = useState<CanvasElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1280);

  // Background removal modal state
  const [bgModalOpen, setBgModalOpen] = useState<boolean>(false);
  const [rawUploadSrc, setRawUploadSrc] = useState<string | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState<boolean>(false);
  const [replacingElementId, setReplacingElementId] = useState<string | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement | null>(null);

  // Export & Print Order Modals
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [orderEmail, setOrderEmail] = useState<string>('');
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Multi-sticker Pack State
  const [stickerPack, setStickerPack] = useState<Array<{ id: string; name: string }>>([
    { id: 'stk-1', name: 'Sticker 1' },
  ]);
  const [activePackIndex, setActivePackIndex] = useState<number>(0);
  const [, setFontLoadTick] = useState<number>(0);

  // Subscribe to dynamic Google Font loading events to trigger instant canvas redraw
  useEffect(() => {
    const unsubscribe = subscribeFontLoad(() => {
      setFontLoadTick((prev) => prev + 1);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!copyToast) return;
    const timer = window.setTimeout(() => setCopyToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [copyToast]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-load fonts for any active text elements
  useEffect(() => {
    elements.forEach((elem) => {
      if (elem.type === 'text' && elem.fontFamily) {
        loadGoogleFont(elem.fontFamily);
      }
    });
  }, [elements]);

  // Drag-over canvas state
  const [isCanvasDragOver, setIsCanvasDragOver] = useState<boolean>(false);

  // Canvas & Offscreen Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // In-memory image cache for instant serialization & smooth rendering
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Interactive Transformation Refs (drag, resize, rotate)
  const activeHandleRef = useRef<TransformHandle>(null);
  const isTransformingRef = useRef<boolean>(false);
  const startMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startElemStateRef = useRef<CanvasElement | null>(null);

  // Safe Element Serialization (strips non-cloneable DOM nodes)
  const serializeElements = useCallback((elems: CanvasElement[]): CanvasElement[] => {
    return elems.map((e) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imgElement, ...rest } = e;
      return rest;
    });
  }, []);

  // Safe Element Deserialization (rehydrates cached HTMLImageElements)
  const deserializeElements = useCallback((raw: CanvasElement[]): CanvasElement[] => {
    return raw.map((elem) => {
      if (elem.type === 'image' && elem.imgSrc) {
        if (imageCacheRef.current.has(elem.imgSrc)) {
          return {
            ...elem,
            imgElement: imageCacheRef.current.get(elem.imgSrc),
          };
        } else {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = elem.imgSrc;
          imageCacheRef.current.set(elem.imgSrc, img);
          return {
            ...elem,
            imgElement: img,
          };
        }
      }
      return elem;
    });
  }, []);

  // Push history snapshot
  const pushHistory = useCallback((newElements: CanvasElement[]) => {
    const cleanSnapshot = serializeElements(newElements);

    setHistory((prev) => {
      const updated = prev.slice(0, Math.min(historyIndex + 1, prev.length));
      updated.push(cleanSnapshot);
      if (updated.length > 30) updated.shift();
      return updated;
    });

    setHistoryIndex((prev) => Math.min(prev + 1, 29));

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          elements: cleanSnapshot,
          borderWidth,
          borderColor,
          hasShadow,
          canvasSize,
        })
      );
    } catch {
      // Ignore quota errors
    }
  }, [historyIndex, serializeElements, borderWidth, borderColor, hasShadow, canvasSize]);

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIdx = historyIndex - 1;
      const targetSnapshot = history[targetIdx];
      if (targetSnapshot) {
        setHistoryIndex(targetIdx);
        setElements(deserializeElements(targetSnapshot));
      }
    }
  }, [historyIndex, history, deserializeElements]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIdx = historyIndex + 1;
      const targetSnapshot = history[targetIdx];
      if (targetSnapshot) {
        setHistoryIndex(targetIdx);
        setElements(deserializeElements(targetSnapshot));
      }
    }
  }, [historyIndex, history, deserializeElements]);

  // Global Keyboard Shortcuts (Undo, Redo, Delete, Arrow Nudge)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Undo: Ctrl+Z / Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
        return;
      }

      // Redo: Ctrl+Y / Cmd+Y / Cmd+Shift+Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z')
      ) {
        e.preventDefault();
        handleRedo();
        return;
      }

      // Duplicate: Ctrl+D / Cmd+D
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd' && selectedId) {
        e.preventDefault();
        handleDuplicateSelected();
        return;
      }

      // Delete: Backspace or Delete
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        e.preventDefault();
        handleDeleteSelected();
        return;
      }

      // Escape: Deselect
      if (e.key === 'Escape') {
        setSelectedId(null);
        return;
      }

      // Arrow Keys Nudge
      if (selectedId && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        setElements((prev) =>
          prev.map((el) => {
            if (el.id === selectedId) {
              let dx = 0;
              let dy = 0;
              if (e.key === 'ArrowLeft') dx = -step;
              if (e.key === 'ArrowRight') dx = step;
              if (e.key === 'ArrowUp') dy = -step;
              if (e.key === 'ArrowDown') dy = step;
              return { ...el, x: el.x + dx, y: el.y + dy };
            }
            return el;
          })
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, selectedId]);

  // Load processed image from the Photo to Sticker flow into the full editor
  const loadProcessedPhotoFromSession = useCallback(() => {
    const storedImage = sessionStorage.getItem('stickermaker_photo_to_sticker_processed');
    if (!storedImage) return false;

    const img = new Image();
    img.onload = () => {
      imageCacheRef.current.set(storedImage, img);

      const maxDim = 420;
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      const width = Math.max(120, img.width * scale);
      const height = Math.max(120, img.height * scale);

      const newElem: CanvasElement = {
        id: `photo-conversion-${Date.now()}`,
        type: 'image',
        imgSrc: storedImage,
        imgElement: img,
        x: canvasSize.width / 2,
        y: canvasSize.height / 2,
        width,
        height,
        opacity: 1,
        angle: 0,
        filterBrightness: 100,
        filterContrast: 100,
        filterSaturation: 100,
        filterBlur: 0,
      };

      setElements([newElem]);
      setSelectedId(newElem.id);
      setBorderWidth(8);
      setBorderColor('#FFFFFF');
      setHasShadow(true);
      pushHistory([newElem]);
      sessionStorage.removeItem('stickermaker_photo_to_sticker_processed');
    };
    img.src = storedImage;
    return true;
  }, [canvasSize.width, canvasSize.height, pushHistory]);

  // Load Template Function
  const loadTemplate = useCallback((tmpl: StickerTemplate) => {
    setBorderWidth(tmpl.borderWidth);
    setBorderColor(tmpl.borderColor);
    setHasShadow(tmpl.hasShadow);

    const loadedElements: CanvasElement[] = tmpl.elements.map((elem, idx) => ({
      id: `elem-${Date.now()}-${idx}`,
      type: elem.type,
      content: elem.content || '',
      imgSrc: elem.src,
      x: elem.x,
      y: elem.y,
      width: elem.width || 200,
      height: elem.height || 100,
      fontSize: elem.fontSize || 24,
      fontFamily: elem.fontFamily || 'Fredoka',
      fill: elem.fill || '#000000',
      stroke: elem.stroke || '#FFFFFF',
      strokeWidth: elem.strokeWidth || 0,
      angle: elem.angle || 0,
      shapeType: elem.shapeType || 'circle',
      opacity: 1,
      filterBrightness: 100,
      filterContrast: 100,
      filterSaturation: 100,
      filterBlur: 0,
      filterSepia: 0,
      filterInvert: 0,
    }));

    const hydrated = deserializeElements(loadedElements);
    setElements(hydrated);
    setSelectedId(hydrated[hydrated.length - 1]?.id || null);
    pushHistory(hydrated);
  }, [deserializeElements, pushHistory]);

  // Initial Boot: Check URL query / localStorage / default template
  useEffect(() => {
    if (loadProcessedPhotoFromSession()) {
      return;
    }

    let targetTemplate: StickerTemplate | undefined;
    if (initialTemplateId) {
      targetTemplate = STICKER_TEMPLATES.find((t) => t.id === initialTemplateId);
    } else if (initialCategory) {
      targetTemplate = STICKER_TEMPLATES.find((t) => t.category === initialCategory);
    }

    if (targetTemplate) {
      loadTemplate(targetTemplate);
    } else {
      // Check if state in localStorage exists
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.elements) && parsed.elements.length > 0) {
            if (parsed.borderWidth !== undefined) setBorderWidth(parsed.borderWidth);
            if (parsed.borderColor !== undefined) setBorderColor(parsed.borderColor);
            if (parsed.hasShadow !== undefined) setHasShadow(parsed.hasShadow);
            if (parsed.canvasSize) setCanvasSize(parsed.canvasSize);

            const hydrated = deserializeElements(parsed.elements);
            setElements(hydrated);
            setSelectedId(hydrated[hydrated.length - 1]?.id || null);
            setHistory([parsed.elements]);
            setHistoryIndex(0);
            return;
          }
        }
      } catch {
        // Ignore fallback
      }

      // Default to first template
      loadTemplate(STICKER_TEMPLATES[0]);
    }
  }, [initialCategory, initialTemplateId, loadTemplate, deserializeElements, loadProcessedPhotoFromSession]);

  const handleMobileSheetDragStart = (clientY: number) => {
    mobileSheetDragRef.current = { startY: clientY, startHeight: mobileSheetHeight };
  };

  const handleMobileSheetDragMove = (clientY: number) => {
    if (!mobileSheetDragRef.current) return;
    const deltaY = mobileSheetDragRef.current.startY - clientY;
    const deltaPct = (deltaY / window.innerHeight) * 100;
    const nextHeight = Math.min(82, Math.max(45, mobileSheetDragRef.current.startHeight + deltaPct));
    setMobileSheetHeight(nextHeight);
  };

  const handleMobileSheetDragEnd = () => {
    mobileSheetDragRef.current = null;
  };

  // Fit to screen helper
  const handleFitToScreen = () => {
    if (!canvasContainerRef.current) {
      setZoomLevel(1);
      return;
    }
    const containerW = canvasContainerRef.current.clientWidth - 48;
    const containerH = canvasContainerRef.current.clientHeight - 48;
    const fitW = containerW / canvasSize.width;
    const fitH = containerH / canvasSize.height;
    const bestZoom = Math.min(Math.max(0.4, Math.min(fitW, fitH)), 1.2);
    setZoomLevel(Number(bestZoom.toFixed(2)));
  };

  // Main Canvas Render Loop (renders elements, filters, and die-cut border)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offscreen = offscreenCanvasRef.current;
    if (!offscreen) {
      offscreen = document.createElement('canvas');
      offscreenCanvasRef.current = offscreen;
    }
    offscreen.width = Math.max(1, canvasSize.width);
    offscreen.height = Math.max(1, canvasSize.height);
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    // Clear offscreen
    offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

    // Draw elements
    elements.forEach((elem) => {
      offCtx.save();
      offCtx.translate(elem.x, elem.y);
      if (elem.angle) {
        offCtx.rotate((elem.angle * Math.PI) / 180);
      }
      offCtx.globalAlpha = elem.opacity ?? 1;

      // Text Layer
      if (elem.type === 'text' && elem.content) {
        const isUrdu = isUrduFontFamily(elem.fontFamily) || hasRtlCharacters(elem.content);
        if ('direction' in offCtx) {
          (offCtx as { direction?: string }).direction = isUrdu ? 'rtl' : 'ltr';
        }

        const weight = elem.fontWeight === 'bold' ? 'bold ' : '';
        const style = elem.fontStyle === 'italic' ? 'italic ' : '';
        offCtx.font = `${style}${weight}${elem.fontSize || 24}px "${elem.fontFamily || 'Fredoka'}", sans-serif`;
        offCtx.textAlign = elem.textAlign || (isUrdu ? 'right' : 'center');
        offCtx.textBaseline = 'middle';

        const lines = elem.content.split('\n');
        const lineHeight = (elem.fontSize || 24) * 1.35;
        const totalHeight = (lines.length - 1) * lineHeight;

        lines.forEach((line, lineIdx) => {
          const ly = -totalHeight / 2 + lineIdx * lineHeight;
          let lx = 0;
          if (elem.textAlign === 'left') lx = -elem.width / 2;
          if (elem.textAlign === 'right' || (!elem.textAlign && isUrdu)) lx = elem.width / 2;

          if (elem.strokeWidth && elem.strokeWidth > 0) {
            offCtx.strokeStyle = elem.stroke || '#000000';
            offCtx.lineWidth = elem.strokeWidth * 2;
            offCtx.lineJoin = 'round';
            offCtx.strokeText(line, lx, ly);
          }
          offCtx.fillStyle = elem.fill || '#000000';
          offCtx.fillText(line, lx, ly);

          // Underline if active
          if (elem.textDecoration === 'underline') {
            const metrics = offCtx.measureText(line);
            const textWidth = metrics.width;
            offCtx.strokeStyle = elem.fill || '#000000';
            offCtx.lineWidth = Math.max(1, (elem.fontSize || 24) / 14);
            offCtx.beginPath();
            const startX = elem.textAlign === 'left' ? lx : (elem.textAlign === 'right' || isUrdu) ? lx - textWidth : -textWidth / 2;
            offCtx.moveTo(startX, ly + (elem.fontSize || 24) * 0.45);
            offCtx.lineTo(startX + textWidth, ly + (elem.fontSize || 24) * 0.45);
            offCtx.stroke();
          }
        });
      }

      // Shape or Badge Layer
      else if (elem.type === 'shape' || elem.type === 'badge') {
        offCtx.fillStyle = elem.fill || '#F43F5E';
        if (elem.strokeWidth && elem.strokeWidth > 0) {
          offCtx.strokeStyle = elem.stroke || '#000000';
          offCtx.lineWidth = elem.strokeWidth;
        }

        const hw = elem.width / 2;
        const hh = elem.height / 2;

        offCtx.beginPath();
        if (elem.shapeType === 'circle') {
          offCtx.arc(0, 0, Math.min(hw, hh), 0, Math.PI * 2);
        } else if (elem.shapeType === 'pill') {
          const r = Math.min(hh, hw);
          if (typeof offCtx.roundRect === 'function') {
            offCtx.roundRect(-hw, -hh, elem.width, elem.height, r);
          } else {
            offCtx.rect(-hw, -hh, elem.width, elem.height);
          }
        } else if (elem.shapeType === 'star') {
          // 5-Point Star
          const spikes = 5;
          const outerR = Math.min(hw, hh);
          const innerR = outerR / 2.2;
          let rot = (Math.PI / 2) * 3;
          const step = Math.PI / spikes;
          offCtx.moveTo(0, -outerR);
          for (let i = 0; i < spikes; i++) {
            let sx = Math.cos(rot) * outerR;
            let sy = Math.sin(rot) * outerR;
            offCtx.lineTo(sx, sy);
            rot += step;
            sx = Math.cos(rot) * innerR;
            sy = Math.sin(rot) * innerR;
            offCtx.lineTo(sx, sy);
            rot += step;
          }
          offCtx.lineTo(0, -outerR);
          offCtx.closePath();
        } else if (elem.shapeType === 'starburst') {
          // 12-Point Burst
          const points = 12;
          const outerR = Math.min(hw, hh);
          const innerR = outerR * 0.78;
          let rot = 0;
          const step = Math.PI / points;
          offCtx.moveTo(outerR, 0);
          for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? outerR : innerR;
            const sx = Math.cos(rot) * r;
            const sy = Math.sin(rot) * r;
            offCtx.lineTo(sx, sy);
            rot += step;
          }
          offCtx.closePath();
        } else if (elem.shapeType === 'bubble') {
          // Speech Bubble
          if (typeof offCtx.roundRect === 'function') {
            offCtx.roundRect(-hw, -hh, elem.width, Math.max(10, elem.height - 18), 16);
          } else {
            offCtx.rect(-hw, -hh, elem.width, Math.max(10, elem.height - 18));
          }
          offCtx.moveTo(-8, hh - 18);
          offCtx.lineTo(-18, hh);
          offCtx.lineTo(8, hh - 18);
        } else if (elem.shapeType === 'arch') {
          // Arch shape
          offCtx.arc(0, -hh + hw, hw, Math.PI, 0, false);
          offCtx.lineTo(hw, hh);
          offCtx.lineTo(-hw, hh);
          offCtx.closePath();
        } else {
          // Rounded Rectangle
          if (typeof offCtx.roundRect === 'function') {
            offCtx.roundRect(-hw, -hh, elem.width, elem.height, 14);
          } else {
            offCtx.rect(-hw, -hh, elem.width, elem.height);
          }
        }

        offCtx.fill();
        if (elem.strokeWidth && elem.strokeWidth > 0) {
          offCtx.stroke();
        }
      }

      // Image Layer
      else if (elem.type === 'image') {
        let img = elem.imgElement;
        if (!img && elem.imgSrc) {
          if (imageCacheRef.current.has(elem.imgSrc)) {
            img = imageCacheRef.current.get(elem.imgSrc);
          } else {
            const newImg = new Image();
            newImg.crossOrigin = 'anonymous';
            newImg.src = elem.imgSrc;
            imageCacheRef.current.set(elem.imgSrc, newImg);
            img = newImg;
          }
        }

        if (img && img.complete && img.naturalWidth > 0) {
          // Construct CSS filter string
          const filterList: string[] = [];
          if (elem.filterBrightness !== undefined && elem.filterBrightness !== 100) {
            filterList.push(`brightness(${elem.filterBrightness}%)`);
          }
          if (elem.filterContrast !== undefined && elem.filterContrast !== 100) {
            filterList.push(`contrast(${elem.filterContrast}%)`);
          }
          if (elem.filterSaturation !== undefined && elem.filterSaturation !== 100) {
            filterList.push(`saturate(${elem.filterSaturation}%)`);
          }
          if (elem.filterBlur && elem.filterBlur > 0) {
            filterList.push(`blur(${elem.filterBlur}px)`);
          }
          if (elem.filterSepia && elem.filterSepia > 0) {
            filterList.push(`sepia(${elem.filterSepia}%)`);
          }
          if (elem.filterInvert && elem.filterInvert > 0) {
            filterList.push(`invert(${elem.filterInvert}%)`);
          }

          if (filterList.length > 0) {
            offCtx.filter = filterList.join(' ');
          }

          // Flip transforms
          const scaleX = elem.flipH ? -1 : 1;
          const scaleY = elem.flipV ? -1 : 1;
          if (scaleX !== 1 || scaleY !== 1) {
            offCtx.scale(scaleX, scaleY);
          }

          try {
            offCtx.drawImage(
              img,
              -elem.width / 2,
              -elem.height / 2,
              elem.width,
              elem.height
            );
          } catch (err) {
            console.warn('Image draw fallback', err);
          }

          offCtx.filter = 'none';
        }
      }

      offCtx.restore();
    });

    // Apply Signature Die-Cut White Border
    const processedCanvas = renderDieCutStickerBorder(
      offscreen,
      borderWidth,
      borderColor,
      hasShadow
    );

    // Draw final output to main viewport canvas
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(processedCanvas, 0, 0);

    // Draw Selection Box & 8 Transform Handles + Rotate Handle
    const selectedElem = elements.find((e) => e.id === selectedId);
    if (selectedElem) {
      ctx.save();
      ctx.translate(selectedElem.x, selectedElem.y);
      if (selectedElem.angle) {
        ctx.rotate((selectedElem.angle * Math.PI) / 180);
      }

      const hw = selectedElem.width / 2;
      const hh = selectedElem.height / 2;
      const pad = 6;

      // Dashed bounding box
      ctx.strokeStyle = '#F43F5E';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(-hw - pad, -hh - pad, selectedElem.width + pad * 2, selectedElem.height + pad * 2);

      // Rotation stem & top handle
      ctx.setLineDash([]);
      ctx.strokeStyle = '#F43F5E';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -hh - pad);
      ctx.lineTo(0, -hh - pad - 20);
      ctx.stroke();

      // Draw 8 Corner & Edge Handles + 1 Rotation Circle
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F43F5E';
      ctx.lineWidth = 2;

      // Top Rotation Handle Circle
      ctx.beginPath();
      ctx.arc(0, -hh - pad - 20, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 8 Handles
      const handles = [
        [-hw - pad, -hh - pad], // NW
        [0, -hh - pad],          // N
        [hw + pad, -hh - pad],  // NE
        [hw + pad, 0],          // E
        [hw + pad, hh + pad],   // SE
        [0, hh + pad],           // S
        [-hw - pad, hh + pad],  // SW
        [-hw - pad, 0],         // W
      ];

      handles.forEach(([hx, hy]) => {
        ctx.fillRect(hx - 4, hy - 4, 8, 8);
        ctx.strokeRect(hx - 4, hy - 4, 8, 8);
      });

      ctx.restore();
    }
  }, [elements, selectedId, borderWidth, borderColor, hasShadow, canvasSize]);

  // Handle Canvas Mouse & Touch Interaction (Selection, Drag, Resize, Rotate)
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const getHandleUnderPoint = (elem: CanvasElement, pt: { x: number; y: number }): TransformHandle => {
    // Transform point into element's local coordinate space
    const rad = -((elem.angle || 0) * Math.PI) / 180;
    const dx = pt.x - elem.x;
    const dy = pt.y - elem.y;
    const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
    const localY = dx * Math.sin(rad) + dy * Math.cos(rad);

    const hw = elem.width / 2;
    const hh = elem.height / 2;
    const pad = 6;
    const hitRadius = 12;

    // Check Rotate handle
    const rotDist = Math.hypot(localX - 0, localY - (-hh - pad - 20));
    if (rotDist <= hitRadius) return 'rot';

    // Check 8 Resize handles
    if (Math.hypot(localX - (-hw - pad), localY - (-hh - pad)) <= hitRadius) return 'nw';
    if (Math.hypot(localX - (hw + pad), localY - (-hh - pad)) <= hitRadius) return 'ne';
    if (Math.hypot(localX - (hw + pad), localY - (hh + pad)) <= hitRadius) return 'se';
    if (Math.hypot(localX - (-hw - pad), localY - (hh + pad)) <= hitRadius) return 'sw';
    if (Math.hypot(localX - 0, localY - (-hh - pad)) <= hitRadius) return 'n';
    if (Math.hypot(localX - (hw + pad), localY - 0) <= hitRadius) return 'e';
    if (Math.hypot(localX - 0, localY - (hh + pad)) <= hitRadius) return 's';
    if (Math.hypot(localX - (-hw - pad), localY - 0) <= hitRadius) return 'w';

    // Check Element Body
    if (localX >= -hw && localX <= hw && localY >= -hh && localY <= hh) {
      return 'body';
    }

    return null;
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const pt = getCanvasCoords(clientX, clientY);

    // If an element is currently selected, first check its handles
    const currentSelected = elements.find((e) => e.id === selectedId);
    if (currentSelected) {
      const handle = getHandleUnderPoint(currentSelected, pt);
      if (handle) {
        activeHandleRef.current = handle;
        isTransformingRef.current = true;
        startMousePosRef.current = pt;
        startElemStateRef.current = { ...currentSelected };
        return;
      }
    }

    // Otherwise hit-test all elements topmost first
    const hit = [...elements].reverse().find((elem) => {
      return getHandleUnderPoint(elem, pt) !== null;
    });

    if (hit) {
      setSelectedId(hit.id);
      activeHandleRef.current = 'body';
      isTransformingRef.current = true;
      startMousePosRef.current = pt;
      startElemStateRef.current = { ...hit };
    } else {
      setSelectedId(null);
      activeHandleRef.current = null;
      isTransformingRef.current = false;
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isTransformingRef.current || !selectedId || !startElemStateRef.current) return;
    const pt = getCanvasCoords(clientX, clientY);
    const startElem = startElemStateRef.current;
    const handle = activeHandleRef.current;

    const dx = pt.x - startMousePosRef.current.x;
    const dy = pt.y - startMousePosRef.current.y;

    if (handle === 'body') {
      // Translation / Drag
      setElements((prev) =>
        prev.map((el) => {
          if (el.id === selectedId) {
            return {
              ...el,
              x: startElem.x + dx,
              y: startElem.y + dy,
            };
          }
          return el;
        })
      );
    } else if (handle === 'rot') {
      // Rotation
      const currentAngleRad = Math.atan2(pt.y - startElem.y, pt.x - startElem.x);
      let deg = (currentAngleRad * 180) / Math.PI + 90;
      if (deg < -180) deg += 360;
      if (deg > 180) deg -= 360;

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === selectedId) {
            return { ...el, angle: Math.round(deg) };
          }
          return el;
        })
      );
    } else if (handle) {
      // Resize with rotation transformation awareness
      const rad = -((startElem.angle || 0) * Math.PI) / 180;
      const localDx = dx * Math.cos(rad) - dy * Math.sin(rad);
      const localDy = dx * Math.sin(rad) + dy * Math.cos(rad);

      let newW = startElem.width;
      let newH = startElem.height;

      if (handle.includes('e')) newW = Math.max(30, startElem.width + localDx * 2);
      if (handle.includes('w')) newW = Math.max(30, startElem.width - localDx * 2);
      if (handle.includes('s')) newH = Math.max(30, startElem.height + localDy * 2);
      if (handle.includes('n')) newH = Math.max(30, startElem.height - localDy * 2);

      // Proportionally scale font size for text
      let newFontSize = startElem.fontSize;
      if (startElem.type === 'text' && startElem.fontSize) {
        const scaleFactor = newW / startElem.width;
        newFontSize = Math.max(12, Math.min(120, Math.round(startElem.fontSize * scaleFactor)));
      }

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === selectedId) {
            return {
              ...el,
              width: Math.round(newW),
              height: Math.round(newH),
              fontSize: newFontSize,
            };
          }
          return el;
        })
      );
    }
  };

  const handlePointerUp = () => {
    if (isTransformingRef.current) {
      isTransformingRef.current = false;
      activeHandleRef.current = null;
      startElemStateRef.current = null;
      pushHistory(elements);
    }
  };

  // Add Text Layer
  const handleAddText = (type: 'title' | 'bubble' | 'urdu' | 'minimal') => {
    let content = 'New Sticker Text';
    let fontFamily = 'Fredoka';
    let fontSize = 32;
    let fill = '#1E293B';
    let stroke = '#FFFFFF';
    let strokeWidth = 2;

    if (type === 'bubble') {
      content = 'SUPER COOL! ★';
      fontFamily = 'Bangers';
      fontSize = 38;
      fill = '#F43F5E';
      stroke = '#FFFFFF';
      strokeWidth = 3;
    } else if (type === 'urdu') {
      content = 'چائے کا کپ ☕';
      fontFamily = 'Noto Nastaliq Urdu';
      fontSize = 34;
      fill = '#78350F';
      stroke = '#FEF3C7';
      strokeWidth = 2;
    } else if (type === 'minimal') {
      content = 'Minimal aesthetic vibe';
      fontFamily = 'Outfit';
      fontSize = 22;
      fill = '#334155';
      strokeWidth = 0;
    }

    const newElem: CanvasElement = {
      id: `elem-${Date.now()}`,
      type: 'text',
      content,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: 280,
      height: 90,
      fontSize,
      fontFamily,
      fill,
      stroke,
      strokeWidth,
      opacity: 1,
      angle: 0,
      filterBrightness: 100,
      filterContrast: 100,
      filterSaturation: 100,
    };

    const updated = [...elements, newElem];
    setElements(updated);
    setSelectedId(newElem.id);
    pushHistory(updated);
  };

  // Add Shape Layer
  const handleAddShape = (shapeType: string, fill: string = '#F43F5E') => {
    const newElem: CanvasElement = {
      id: `elem-${Date.now()}`,
      type: 'shape',
      shapeType,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: shapeType === 'pill' ? 260 : 180,
      height: shapeType === 'pill' ? 120 : 180,
      fill,
      stroke: '#000000',
      strokeWidth: 2,
      opacity: 1,
      angle: 0,
    };

    const updated = [newElem, ...elements];
    setElements(updated);
    setSelectedId(newElem.id);
    pushHistory(updated);
  };

  // Add Clipart Layer
  const handleAddClipart = (item: ClipartItem) => {
    if (item.category === 'urdu') {
      const newElem: CanvasElement = {
        id: `elem-${Date.now()}`,
        type: 'text',
        content: item.name,
        fontFamily: 'Noto Nastaliq Urdu',
        fontSize: 32,
        fill: '#78350F',
        stroke: '#FEF3C7',
        strokeWidth: 2,
        x: canvasSize.width / 2,
        y: canvasSize.height / 2,
        width: 260,
        height: 100,
        opacity: 1,
        angle: 0,
      };
      const updated = [...elements, newElem];
      setElements(updated);
      setSelectedId(newElem.id);
      pushHistory(updated);
    } else {
      handleAddShape('circle', '#FEF08A');
    }
  };

  // Upload image handler with Before/After Cutout Modal
  const handleUploadImageFile = (file: File) => {
    setIsProcessingUpload(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rawBase64 = ev.target?.result as string;
      setRawUploadSrc(rawBase64);
      setBgModalOpen(true);
      setIsProcessingUpload(false);
    };
    reader.readAsDataURL(file);
  };

  // Trigger Replace Image for existing element
  const handleTriggerReplaceImage = (elementId?: string) => {
    const targetId = elementId || selectedId;
    if (targetId) {
      setReplacingElementId(targetId);
      setSelectedId(targetId);
    }
    replaceFileInputRef.current?.click();
  };

  const handleReplaceFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessingUpload(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rawBase64 = ev.target?.result as string;
      setRawUploadSrc(rawBase64);
      setBgModalOpen(true);
      setIsProcessingUpload(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Apply processed cutout image from modal to canvas
  const handleApplyCutoutImage = (
    finalSrc: string,
    options?: { backgroundRemoved: boolean; originalSrc: string }
  ) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCacheRef.current.set(finalSrc, img);
      const originalSrc = options?.originalSrc || finalSrc;
      const backgroundRemoved = options?.backgroundRemoved ?? true;

      if (replacingElementId) {
        // User is replacing an existing image in place
        setElements((prev) => {
          const next = prev.map((elem) => {
            if (elem.id === replacingElementId) {
              const maxDim = Math.max(elem.width, elem.height, 220);
              const scale = Math.min(maxDim / img.width, maxDim / img.height, 1.2);
              const width = Math.round(img.width * scale);
              const height = Math.round(img.height * scale);
              return {
                ...elem,
                type: 'image' as const,
                imgSrc: finalSrc,
                originalImageSrc: originalSrc,
                backgroundRemoved,
                imgElement: img,
                width,
                height,
              };
            }
            return elem;
          });
          pushHistory(next);
          return next;
        });
        setReplacingElementId(null);
      } else {
        const maxDim = 320;
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
        const width = img.width * scale;
        const height = img.height * scale;

        const newElem: CanvasElement = {
          id: `elem-${Date.now()}`,
          type: 'image',
          imgSrc: finalSrc,
          originalImageSrc: originalSrc,
          backgroundRemoved,
          imgElement: img,
          x: canvasSize.width / 2,
          y: canvasSize.height / 2,
          width,
          height,
          opacity: 1,
          angle: 0,
          filterBrightness: 100,
          filterContrast: 100,
          filterSaturation: 100,
          filterBlur: 0,
        };

        const updated = [...elements, newElem];
        setElements(updated);
        setSelectedId(newElem.id);
        pushHistory(updated);
      }
    };
    img.src = finalSrc;
  };

  const handleRestoreOriginalBackground = useCallback(() => {
    if (!selectedId) return;
    const selected = elements.find((elem) => elem.id === selectedId);
    if (!selected || !selected.originalImageSrc) return;

    setElements((prev) => {
      const next = prev.map((elem) => {
        if (elem.id !== selectedId) return elem;
        return {
          ...elem,
          imgSrc: selected.originalImageSrc,
          imgElement: undefined,
          backgroundRemoved: false,
        };
      });
      pushHistory(next);
      return next;
    });
  }, [elements, selectedId, pushHistory]);

  // Element Actions
  const handleUpdateSelected = (props: Partial<CanvasElement>) => {
    if (!selectedId) return;
    setElements((prev) => {
      const next = prev.map((elem) => (elem.id === selectedId ? { ...elem, ...props } : elem));
      pushHistory(next);
      return next;
    });
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;
    const updated = elements.filter((e) => e.id !== selectedId);
    setElements(updated);
    setSelectedId(null);
    pushHistory(updated);
  };

  const handleDuplicateSelected = () => {
    const sel = elements.find((e) => e.id === selectedId);
    if (!sel) return;
    const cloned: CanvasElement = {
      ...sel,
      id: `elem-${Date.now()}`,
      x: sel.x + 20,
      y: sel.y + 20,
    };
    const updated = [...elements, cloned];
    setElements(updated);
    setSelectedId(cloned.id);
    pushHistory(updated);
  };

  const handleLayerOrder = (direction: 'up' | 'down' | 'front' | 'back') => {
    if (!selectedId) return;
    const index = elements.findIndex((e) => e.id === selectedId);
    if (index === -1) return;

    const updated = [...elements];
    const item = updated.splice(index, 1)[0];

    if (direction === 'front') updated.push(item);
    else if (direction === 'back') updated.unshift(item);
    else if (direction === 'up') updated.splice(Math.min(updated.length, index + 1), 0, item);
    else if (direction === 'down') updated.splice(Math.max(0, index - 1), 0, item);

    setElements(updated);
    pushHistory(updated);
  };

  // Canvas Drag-and-Drop file import
  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCanvasDragOver(true);
  };

  const handleCanvasDragLeave = () => {
    setIsCanvasDragOver(false);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCanvasDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadImageFile(e.dataTransfer.files[0]);
    }
  };

  // Trigger Download / Copy / Export
  const triggerExport = async (format: 'copy-clipboard' | 'png-transparent' | 'png-highres' | 'pdf-300dpi') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (format === 'copy-clipboard') {
      const copied = await copyCanvasToClipboard(canvas, 1);
      if (copied) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F43F5E', '#F59E0B', '#10B981', '#6366F1'],
        });
        setCopyToast('Copied! Paste it in WhatsApp');
      } else {
        setCopyToast('Clipboard copy not supported — downloading instead.');
        await downloadCanvasAsPNG(canvas, `sticker-transparent-${Date.now()}.png`, 1);
      }
      setShowExportModal(false);
      return;
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#F59E0B', '#10B981', '#6366F1'],
    });

    if (format === 'pdf-300dpi') {
      downloadCanvasAsPrintPDF(canvas, `sticker-300dpi-${Date.now()}.pdf`);
    } else if (format === 'png-highres') {
      downloadCanvasAsPNG(canvas, `sticker-highres-2x-${Date.now()}.png`, 2);
    } else {
      downloadCanvasAsPNG(canvas, `sticker-transparent-${Date.now()}.png`, 1);
    }
    setShowExportModal(false);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderEmail) return;

    try {
      await fetch('/api/order-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: orderEmail,
          quantity: 50,
          finish: 'Glossy Vinyl Die-Cut',
          stickerName: 'Custom Sticker Project',
        }),
      });
    } catch {
      // Ignore
    }

    setOrderSubmitted(true);
  };

  const selectedElement = elements.find((e) => e.id === selectedId) || null;

  // Get canvas bounding rectangle for positioning floating toolbar
  const getCanvasBounds = () => {
    if (!canvasRef.current) return null;
    return canvasRef.current.getBoundingClientRect();
  };

  const isMobile = viewportWidth < 768;
  const mobileAvailableWidth = isMobile ? Math.max(220, viewportWidth - 24) : Number.POSITIVE_INFINITY;
  const mobileAvailableHeight = isMobile
    ? Math.max(240, (typeof window !== 'undefined' ? window.innerHeight : 800) - 210)
    : Number.POSITIVE_INFINITY;
  const mobileCanvasScale = isMobile
    ? Math.min(1, mobileAvailableWidth / Math.max(canvasSize.width, 1), mobileAvailableHeight / Math.max(canvasSize.height, 1))
    : 1;
  const effectiveCanvasScale = isMobile ? Math.min(zoomLevel, mobileCanvasScale) : zoomLevel;
  const renderedCanvasWidth = isMobile
    ? Math.min(canvasSize.width * effectiveCanvasScale, mobileAvailableWidth)
    : canvasSize.width;
  const renderedCanvasHeight = isMobile
    ? renderedCanvasWidth * (canvasSize.height / Math.max(canvasSize.width, 1))
    : 'auto';

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col bg-[#eef2f7] select-none">
      {/* 1. TOP HEADER STUDIO CONTROLS BAR */}
      <header 
        aria-label="Editor Header" 
        className="min-h-[58px] border-b border-slate-700 bg-[#101827] px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-30 shrink-0 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
      >
        {/* Left: Home Navigation & Project Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-left transition-all hover:border-rose-400/60 hover:bg-white/10"
            title="Back to Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-400 text-white shadow-sm ring-2 ring-white/10">
              <Scissors className="h-4 w-4 -rotate-45" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Studio</div>
              <div className="text-sm font-extrabold text-white">StickerMaker</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 text-xs font-semibold text-slate-300">
            <button onClick={() => onNavigate({ type: 'editor' })} className="rounded-lg bg-white px-3 py-1.5 text-slate-900 shadow-sm">Create</button>
            <button onClick={() => onNavigate({ type: 'templates' })} className="rounded-lg px-3 py-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">Templates</button>
            <button onClick={() => onNavigate({ type: 'templates' })} className="rounded-lg px-3 py-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">My Designs</button>
            <button onClick={() => onNavigate({ type: 'pricing' })} className="rounded-lg px-3 py-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">Pricing</button>
            <button onClick={() => onNavigate({ type: 'about' })} className="rounded-lg px-3 py-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">Help</button>
          </nav>

          {/* Mobile Sidebar Toggle Button */}

          {/* Undo / Redo with Keyboard Tooltips */}
          <div className="flex items-center gap-1 border-l border-white/10 pl-3">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Canvas Size Presets */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setCanvasSize({ width: 512, height: 512, name: 'WhatsApp (512x512)' })}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              canvasSize.width === 512 ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            WhatsApp (512px)
          </button>
          <button
            onClick={() => setCanvasSize({ width: 600, height: 600, name: 'Square (600x600)' })}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              canvasSize.width === 600 ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            Square (600px)
          </button>
          <button
            onClick={() => setCanvasSize({ width: 720, height: 720, name: '300 DPI Print (720px)' })}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              canvasSize.width === 720 ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            300 DPI Vinyl
          </button>
        </div>

        {/* Right: Copy Primary Action & Order Printed Stickers */}
        <div className="flex items-center gap-2 max-w-full overflow-x-auto no-scrollbar ml-auto">
          <button
            id="editor-order-prints-btn"
            onClick={() => setShowOrderModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-xs border border-white/10"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Order Prints</span>
          </button>

          <button
            id="editor-save-btn"
            onClick={() => setShowExportModal(true)}
            className="inline-flex flex-shrink-0 items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-xl shadow-lg shadow-rose-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Save / Export</span>
          </button>

          <button
            id="editor-copy-btn"
            onClick={() => void triggerExport('copy-clipboard')}
            title="Copy sticker to clipboard"
            className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-xl border border-white/10 shadow-xs transition-all"
          >
            <Copy className="w-4 h-4 text-slate-200" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN 3-COLUMN STUDIO WORKSPACE */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative bg-[#eef2f7] md:pb-0">
        {/* DESKTOP LEFT COLUMN: Sidebar Navigation & Content Drawer */}
        <div className="hidden md:flex h-full">
          <TemplateSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            borderWidth={borderWidth}
            onBorderWidthChange={setBorderWidth}
            borderColor={borderColor}
            onBorderColorChange={setBorderColor}
            hasShadow={hasShadow}
            onHasShadowToggle={() => setHasShadow(!hasShadow)}
            previewBg={previewBg}
            onPreviewBgChange={setPreviewBg}
            onSelectTemplate={loadTemplate}
            onAddText={handleAddText}
            onAddShape={handleAddShape}
            onAddClipart={handleAddClipart}
            onUploadImageFile={handleUploadImageFile}
            isProcessingUpload={isProcessingUpload}
            stickerPack={stickerPack}
            activePackIndex={activePackIndex}
            onSelectPackIndex={setActivePackIndex}
            onAddPackItem={() => {
              const newId = `stk-${stickerPack.length + 1}`;
              setStickerPack([...stickerPack, { id: newId, name: `Sticker ${stickerPack.length + 1}` }]);
              setActivePackIndex(stickerPack.length);
            }}
          />
        </div>

        {/* MOBILE LEFT DRAWER MODAL */}
        {activeMobilePanel && activeMobilePanel !== 'inspect' && (
          <div className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-neutral-900/20 backdrop-blur-[1px] flex justify-center animate-in fade-in duration-150">
            <div className="w-full max-w-md bg-white rounded-t-[28px] max-h-[78vh] h-[78vh] flex flex-col overflow-hidden shadow-[0_-10px_30px_rgba(15,23,42,0.18)] border-t border-neutral-200">
              <div className="flex items-center justify-center border-b border-neutral-100 px-4 py-2">
                <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <TemplateSidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  borderWidth={borderWidth}
                  onBorderWidthChange={setBorderWidth}
                  borderColor={borderColor}
                  onBorderColorChange={setBorderColor}
                  hasShadow={hasShadow}
                  onHasShadowToggle={() => setHasShadow(!hasShadow)}
                  previewBg={previewBg}
                  onPreviewBgChange={setPreviewBg}
                  onSelectTemplate={(tmpl) => {
                    loadTemplate(tmpl);
                    setActiveMobilePanel(null);
                  }}
                  onAddText={(type) => {
                    handleAddText(type);
                    setActiveMobilePanel(null);
                  }}
                  onAddShape={(shape, fill) => {
                    handleAddShape(shape, fill);
                    setActiveMobilePanel(null);
                  }}
                  onAddClipart={(item) => {
                    handleAddClipart(item);
                    setActiveMobilePanel(null);
                  }}
                  onUploadImageFile={(file) => {
                    handleUploadImageFile(file);
                    setActiveMobilePanel(null);
                  }}
                  isProcessingUpload={isProcessingUpload}
                  stickerPack={stickerPack}
                  activePackIndex={activePackIndex}
                  onSelectPackIndex={setActivePackIndex}
                  onAddPackItem={() => {
                    const newId = `stk-${stickerPack.length + 1}`;
                    setStickerPack([...stickerPack, { id: newId, name: `Sticker ${stickerPack.length + 1}` }]);
                    setActivePackIndex(stickerPack.length);
                  }}
                  onCloseMobile={() => setActiveMobilePanel(null)}
                />
              </div>
            </div>
          </div>
        )}

        {/* CENTER COLUMN: Live Interactive Viewport */}
        <main 
          ref={canvasContainerRef}
          aria-label="Sticker Canvas Viewport"
          className="flex-1 flex min-h-0 flex-col items-center justify-center relative z-10 overflow-hidden px-1 pt-0 pb-2 sm:px-4 sm:pt-2 sm:pb-3 md:px-8 md:pb-0 md:pt-8"
          style={{
            minHeight: isMobile ? 'calc(100dvh - 52px - 30px)' : undefined,
          }}
        >
          {/* Floating Contextual Toolbar near selected element */}
          <FloatingToolbar
            element={selectedElement}
            canvasBounds={getCanvasBounds()}
            canvasSize={canvasSize}
            zoom={zoomLevel}
            onUpdate={handleUpdateSelected}
            onDuplicate={handleDuplicateSelected}
            onDelete={handleDeleteSelected}
            onLayerOrder={handleLayerOrder}
            onReplaceImage={handleTriggerReplaceImage}
            onTriggerBgRemoval={() => {
              if (selectedElement?.type === 'image' && selectedElement.imgSrc) {
                setRawUploadSrc(selectedElement.imgSrc);
                setBgModalOpen(true);
              }
            }}
          />

          {/* Interactive Canvas Container with Drag & Drop */}
          <div
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            onDrop={handleCanvasDrop}
            className={`w-full max-w-full flex items-center justify-center rounded-2xl p-2 sm:p-4 md:p-6 transition-all duration-150 shadow-xl border border-neutral-200/80 relative ${
              isCanvasDragOver ? 'ring-4 ring-rose-500 scale-102' : ''
            } ${
              previewBg === 'checkerboard'
                ? 'checkerboard-bg'
                : previewBg === 'dark'
                ? 'bg-neutral-900'
                : previewBg === 'mint'
                ? 'bg-emerald-100'
                : 'bg-amber-100'
            }`}
            style={{
              overflow: 'hidden',
              minHeight: isMobile ? 'min(38vh, 280px)' : 'auto',
            }}
          >
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
              onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
              onMouseUp={handlePointerUp}
              onTouchStart={(e) => {
                if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchEnd={handlePointerUp}
              className="cursor-crosshair w-full max-w-full object-contain shadow-2xs touch-none"
              style={{
                width: `${renderedCanvasWidth}px`,
                maxWidth: '100%',
                height: isMobile ? `${renderedCanvasHeight}px` : 'auto',
              }}
            />

            {/* Drag & Drop Visual Overlay */}
            {isCanvasDragOver && (
              <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-2xs rounded-2xl flex items-center justify-center text-rose-700 font-extrabold text-sm border-2 border-dashed border-rose-500 pointer-events-none">
                Drop image to import & auto cutout
              </div>
            )}
          </div>

          {/* Bottom Zoom & Viewport Controls Bar */}
          <div className="absolute bottom-3 md:bottom-4 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-neutral-200 text-xs text-neutral-600">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
              className="p-1 hover:bg-neutral-100 rounded-lg transition-colors min-h-8 min-w-8 flex items-center justify-center"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => setZoomLevel(1)}
              className="font-bold px-2 py-0.5 hover:bg-neutral-100 rounded text-neutral-800 text-xs"
              title="Reset Zoom to 100%"
            >
              {Math.round(zoomLevel * 100)}%
            </button>

            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, Number((z + 0.1).toFixed(2))))}
              className="p-1 hover:bg-neutral-100 rounded-lg transition-colors min-h-8 min-w-8 flex items-center justify-center"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-neutral-200 mx-1" />

            <button
              onClick={handleFitToScreen}
              className="flex items-center gap-1 px-2 py-1 hover:bg-neutral-100 rounded-lg text-[11px] font-semibold text-neutral-700 transition-colors"
              title="Fit Sticker to Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fit Screen</span>
            </button>
          </div>
        </main>

        {/* DESKTOP RIGHT COLUMN: Layer Inspector & Property Controls */}
        <div className="hidden lg:block">
          <PropertiesPanel
            selectedElement={selectedElement}
            elements={elements}
            onSelectElement={setSelectedId}
            onUpdateSelected={handleUpdateSelected}
            onDuplicateSelected={handleDuplicateSelected}
            onDeleteSelected={handleDeleteSelected}
            onLayerOrder={handleLayerOrder}
            onReplaceImage={handleTriggerReplaceImage}
            onTriggerBgRemoval={() => {
              if (selectedElement?.type === 'image' && selectedElement.imgSrc) {
                setRawUploadSrc(selectedElement.originalImageSrc || selectedElement.imgSrc);
                setBgModalOpen(true);
              }
            }}
            onRestoreOriginalBackground={handleRestoreOriginalBackground}
            borderWidth={borderWidth}
            onBorderWidthChange={setBorderWidth}
            borderColor={borderColor}
            onBorderColorChange={setBorderColor}
            hasShadow={hasShadow}
            onHasShadowToggle={() => setHasShadow(!hasShadow)}
          />
        </div>

        {/* MOBILE BOTTOM SHEET FOR PROPERTIES / LAYERS */}
        {activeMobilePanel === 'inspect' && (
          <div className="fixed inset-0 z-40 lg:hidden pointer-events-none" aria-hidden="true">
            <div className="absolute inset-x-0 top-0 h-[52vh] bg-neutral-900/5" />
            <div className="absolute inset-0 flex flex-col justify-end pointer-events-auto" onClick={() => setActiveMobilePanel(null)}>
              <div className="w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
                <div
                  className="w-full max-w-md bg-white rounded-t-[28px] shadow-2xl border-t border-neutral-200 overflow-hidden"
                  style={{ height: `${mobileSheetHeight}vh`, maxHeight: `${mobileSheetHeight}vh` }}
                >
                  <div
                    className="flex cursor-grab touch-none select-none items-center justify-center border-b border-neutral-100 bg-white px-4 py-2 active:cursor-grabbing"
                    onPointerDown={(e) => handleMobileSheetDragStart(e.clientY)}
                    onPointerMove={(e) => handleMobileSheetDragMove(e.clientY)}
                    onPointerUp={handleMobileSheetDragEnd}
                    onPointerLeave={handleMobileSheetDragEnd}
                  >
                    <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
                  </div>
                  <PropertiesPanel
                    selectedElement={selectedElement}
                    elements={elements}
                    onSelectElement={setSelectedId}
                    onUpdateSelected={handleUpdateSelected}
                    onDuplicateSelected={handleDuplicateSelected}
                    onDeleteSelected={handleDeleteSelected}
                    onLayerOrder={handleLayerOrder}
                    onReplaceImage={handleTriggerReplaceImage}
                    onTriggerBgRemoval={() => {
                      if (selectedElement?.type === 'image' && selectedElement.imgSrc) {
                        setRawUploadSrc(selectedElement.originalImageSrc || selectedElement.imgSrc);
                        setBgModalOpen(true);
                      }
                    }}
                    onRestoreOriginalBackground={handleRestoreOriginalBackground}
                    borderWidth={borderWidth}
                    onBorderWidthChange={setBorderWidth}
                    borderColor={borderColor}
                    onBorderColorChange={setBorderColor}
                    hasShadow={hasShadow}
                    onHasShadowToggle={() => setHasShadow(!hasShadow)}
                    isMobileModal={true}
                    onCloseMobile={() => setActiveMobilePanel(null)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input for Image Replacement */}
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleReplaceFileSelected}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
      />

      {/* MOBILE BOTTOM TOOLBAR DOCK */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 px-2 py-1.5 flex items-center justify-around shadow-lg"
        style={{
          paddingBottom: 'calc(0.25rem + env(safe-area-inset-bottom))',
          height: 'calc(3.25rem + env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={() => {
            const nextPanel: Exclude<MobilePanel, null> = 'dieCut';
            setActiveTab('border');
            setActiveMobilePanel((current) => current === nextPanel ? null : nextPanel);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-12.5 min-h-11 justify-center transition-colors ${
            activeMobilePanel === 'dieCut' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span className="text-[10px]">Die-Cut</span>
        </button>

        <button
          onClick={() => {
            const nextPanel: Exclude<MobilePanel, null> = 'templates';
            setActiveTab('templates');
            setActiveMobilePanel((current) => current === nextPanel ? null : nextPanel);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-12.5 min-h-11 justify-center transition-colors ${
            activeMobilePanel === 'templates' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px]">Templates</span>
        </button>

        <button
          onClick={() => {
            const nextPanel: Exclude<MobilePanel, null> = 'text';
            setActiveTab('text');
            setActiveMobilePanel((current) => current === nextPanel ? null : nextPanel);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-12.5 min-h-11 justify-center transition-colors ${
            activeMobilePanel === 'text' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600'
          }`}
        >
          <Type className="w-4 h-4" />
          <span className="text-[10px]">Text</span>
        </button>

        <button
          onClick={() => {
            const nextPanel: Exclude<MobilePanel, null> = 'uploads';
            setActiveTab('uploads');
            setActiveMobilePanel((current) => current === nextPanel ? null : nextPanel);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-12.5 min-h-11 justify-center transition-colors ${
            activeMobilePanel === 'uploads' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span className="text-[10px]">Upload</span>
        </button>

        <button
          onClick={() => {
            const nextPanel: Exclude<MobilePanel, null> = 'clipart';
            setActiveTab('elements');
            setActiveMobilePanel((current) => current === nextPanel ? null : nextPanel);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-12.5 min-h-11 justify-center transition-colors ${
            activeMobilePanel === 'clipart' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600'
          }`}
        >
          <Shapes className="w-4 h-4" />
          <span className="text-[10px]">Clipart</span>
        </button>

        <button
          onClick={() => {
            const nextPanel: Exclude<MobilePanel, null> = 'pack';
            setActiveTab('pack');
            setActiveMobilePanel((current) => current === nextPanel ? null : nextPanel);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-12.5 min-h-11 justify-center transition-colors ${
            activeMobilePanel === 'pack' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600'
          }`}
        >
          <Package className="w-4 h-4" />
          <span className="text-[10px]">Pack</span>
        </button>

        <button
          onClick={() => {
            const nextPanel: Exclude<MobilePanel, null> = 'inspect';
            setActiveMobilePanel((current) => current === nextPanel ? null : nextPanel);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl min-w-12.5 min-h-11 justify-center relative transition-colors ${
            activeMobilePanel === 'inspect' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600'
          }`}
        >
          <div className="relative">
            <Layers className="w-4 h-4" />
            {selectedElement && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px]">{selectedElement ? 'Inspect' : 'Layers'}</span>
        </button>
      </div>

      {/* 3. BACKGROUND REMOVAL BEFORE/AFTER MODAL */}
      <BgRemovalModal
        isOpen={bgModalOpen}
        rawImageSrc={rawUploadSrc}
        onClose={() => {
          setBgModalOpen(false);
          setRawUploadSrc(null);
        }}
        onApply={handleApplyCutoutImage}
      />

      {/* 4. EXPORT / DOWNLOAD MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-150">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-rose-500" />
                <h3 className="font-extrabold text-base text-neutral-900">Export Your Custom Sticker</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Primary action: Copy direct to chat */}
              <button
                id="copy-clipboard-btn"
                onClick={() => void triggerExport('copy-clipboard')}
                className="w-full p-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white border border-rose-500 text-left transition-all group flex items-center justify-between shadow-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">
                      Copy to Clipboard
                    </span>
                    <span className="text-[10px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded">
                      Paste in chat
                    </span>
                  </div>
                  <p className="text-xs text-rose-50">Paste directly into WhatsApp, Messenger, and other apps</p>
                </div>
                <Copy className="w-4 h-4 text-white" />
              </button>

              {/* Option 1: Transparent PNG */}
              <button
                id="export-png-transparent-btn"
                onClick={() => void triggerExport('png-transparent')}
                className="w-full p-4 rounded-xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/50 text-left transition-all group flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900 group-hover:text-rose-600">
                      Transparent PNG
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      WhatsApp / Digital
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">Includes crisp die-cut outline and alpha transparency</p>
                </div>
                <Download className="w-4 h-4 text-neutral-400 group-hover:text-rose-600" />
              </button>

              {/* Option 2: High-Resolution 2X PNG */}
              <button
                id="export-png-highres-btn"
                onClick={() => void triggerExport('png-highres')}
                className="w-full p-4 rounded-xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/50 text-left transition-all group flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900 group-hover:text-rose-600">
                      High-Res 2X PNG (1200px)
                    </span>
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                      Merch & Social
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">Ultra-sharp resolution for avatars and social posts</p>
                </div>
                <Download className="w-4 h-4 text-neutral-400 group-hover:text-rose-600" />
              </button>

              {/* Option 3: Print-Ready 300 DPI PDF */}
              <button
                id="export-pdf-300dpi-btn"
                onClick={() => void triggerExport('pdf-300dpi')}
                className="w-full p-4 rounded-xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/50 text-left transition-all group flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900 group-hover:text-rose-600">
                      Print-Ready PDF (300 DPI)
                    </span>
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                      Cricut / Vinyl
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">Calibrated vector margin for physical cutter plotters</p>
                </div>
                <Download className="w-4 h-4 text-neutral-400 group-hover:text-rose-600" />
              </button>
            </div>

            <div className="pt-2 text-center text-[11px] text-neutral-400">
              100% Free • No watermarks • No login required
            </div>
          </div>
        </div>
      )}

      {copyToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] rounded-full bg-neutral-900 text-white text-xs font-semibold px-3.5 py-2 shadow-lg animate-in fade-in">
          {copyToast}
        </div>
      )}

      {/* 5. ORDER PRINTED STICKERS MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-150">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-500" />
                <h3 className="font-extrabold text-base text-neutral-900">Order Printed Vinyl Stickers</h3>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-base text-neutral-900">You're on the VIP Print List!</h4>
                <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
                  We'll email you a 20% early-bird voucher as soon as physical vinyl batch shipping launches in your area.
                </p>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="mt-4 bg-neutral-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
                >
                  Back to Sticker Editor
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Get your custom sticker printed on weatherproof, UV-resistant vinyl with satin matte or holographic finishes.
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="creator@example.com"
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                    className="w-full text-xs p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Sample Pack</span>
                    <span className="font-bold text-neutral-800">50 Custom Die-Cuts</span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Material</span>
                    <span className="font-bold text-neutral-800">Weatherproof Vinyl</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors"
                >
                  Join Print Priority List (Get 20% Off)
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
