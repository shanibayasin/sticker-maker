import React, { useRef, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Palette, 
  Shapes, 
  RotateCw, 
  FlipHorizontal, 
  FlipVertical, 
  Copy, 
  Trash2, 
  Layers, 
  Sparkles, 
  ChevronDown,
  ImagePlus
} from 'lucide-react';
import { CanvasElement } from '../../types/sticker';
import { FontPicker } from './FontPicker';

interface FloatingToolbarProps {
  element: CanvasElement | null;
  canvasBounds: { left: number; top: number; width: number; height: number } | null;
  canvasSize: { width: number; height: number };
  zoom: number;
  onUpdate: (props: Partial<CanvasElement>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onLayerOrder: (direction: 'up' | 'down' | 'front' | 'back') => void;
  onTriggerBgRemoval?: () => void;
  onReplaceImage?: (elementId?: string) => void;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  element,
  canvasBounds,
  canvasSize,
  zoom,
  onUpdate,
  onDuplicate,
  onDelete,
  onLayerOrder,
  onTriggerBgRemoval,
  onReplaceImage,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showShapePicker, setShowShapePicker] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showRotateMenu, setShowRotateMenu] = useState(false);
  const mobileToolbarScrollRef = useRef<HTMLDivElement | null>(null);

  const toggleShapePicker = () => {
    setShowShapePicker((current) => {
      const next = !current;
      if (next) setShowColorPicker(false);
      return next;
    });
  };

  const toggleColorPicker = () => {
    setShowColorPicker((current) => {
      const next = !current;
      if (next) setShowShapePicker(false);
      return next;
    });
  };

  if (!element || !canvasBounds) return null;

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 720;
  const isMobile = viewportWidth < 768;
  const toolbarWidth = isMobile ? Math.min(viewportWidth - 16, 340) : 220;
  const toolbarHeight = isMobile ? 42 : 48;
  const gap = isMobile ? 8 : 10;

  const scaleY = canvasBounds.height / Math.max(canvasSize.height, 1);
  const centerX = canvasBounds.left + (element.x / canvasSize.width) * canvasBounds.width;
  const centerY = canvasBounds.top + (element.y / canvasSize.height) * canvasBounds.height;
  const elemScreenHeight = Math.max(element.height * scaleY, 20);
  const elemScreenTop = centerY - elemScreenHeight / 2;
  const elemScreenBottom = centerY + elemScreenHeight / 2;

  const spaceAbove = elemScreenTop;
  const spaceBelow = viewportHeight - elemScreenBottom;
  const preferAbove = spaceAbove >= toolbarHeight + gap + 20;

  let topPos = preferAbove ? elemScreenTop - toolbarHeight - gap : elemScreenBottom + gap;

  if (topPos < 8) {
    topPos = Math.min(Math.max(elemScreenBottom + gap, 8), Math.max(8, viewportHeight - toolbarHeight - 8));
  }

  if (topPos + toolbarHeight > viewportHeight - 8) {
    topPos = Math.max(8, viewportHeight - toolbarHeight - 8);
  }

  const minLeft = 8;
  const maxLeft = Math.max(minLeft, viewportWidth - toolbarWidth - 8);
  let leftPos = centerX - toolbarWidth / 2;
  if (isMobile) {
    leftPos = Math.min(Math.max(centerX - toolbarWidth / 2, minLeft), maxLeft);
  } else {
    leftPos = Math.min(Math.max(leftPos, minLeft), maxLeft);
  }

  topPos = Math.min(Math.max(topPos, 8), Math.max(8, viewportHeight - toolbarHeight - 8));

  const colors = [
    '#000000', '#FFFFFF', '#F43F5E', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#78350F'
  ];

  const shapes = [
    { type: 'circle', label: 'Circle' },
    { type: 'rounded-rect', label: 'Rounded' },
    { type: 'pill', label: 'Pill Badge' },
    { type: 'star', label: 'Star' },
    { type: 'starburst', label: 'Burst' },
    { type: 'bubble', label: 'Speech' },
    { type: 'arch', label: 'Arch' },
  ];

  return (
    <div
      className="fixed z-40 bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-2xl shadow-xl border border-neutral-200 text-neutral-700 text-xs animate-in fade-in zoom-in-95 duration-100 select-none"
      style={{
        top: `${topPos}px`,
        left: `${leftPos}px`,
        width: isMobile ? `${toolbarWidth}px` : undefined,
        maxWidth: isMobile ? 'calc(100vw - 16px)' : undefined,
        overflowX: isMobile ? 'auto' : 'visible',
        overflowY: 'visible',
        overscrollBehaviorX: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        touchAction: isMobile ? 'pan-x' : 'auto',
      }}
    >
      <div
        ref={mobileToolbarScrollRef}
        className="mobile-toolbar-scroll flex items-center gap-1 flex-nowrap"
        style={{
          width: isMobile ? 'max-content' : 'auto',
          minWidth: isMobile ? '100%' : undefined,
          whiteSpace: 'nowrap',
        }}
      >
      {/* 1. TEXT CONTROLS */}
      {element.type === 'text' && (
        <>
          {/* Font Family Dropdown */}
          <FontPicker
            value={element.fontFamily || 'Fredoka'}
            onChange={(fontName, isRtl) =>
              onUpdate({
                fontFamily: fontName,
                ...(isRtl && !element.textAlign ? { textAlign: 'right' } : {}),
              })
            }
            triggerClassName="bg-neutral-100 hover:bg-neutral-200/80 border-0 px-2 py-1 h-7 rounded-lg text-xs"
            popoverPlacement="bottom-start"
          />

          {/* Font Size Decrement / Increment */}
          <div className="flex items-center gap-0.5 bg-neutral-100 rounded-lg p-0.5">
            <button
              onClick={() => onUpdate({ fontSize: Math.max(12, (element.fontSize || 24) - 2) })}
              className="w-5 h-5 flex items-center justify-center font-bold text-neutral-600 hover:bg-white rounded"
              title="Decrease Size"
            >
              -
            </button>
            <span className="w-6 text-center text-[11px] font-bold">{element.fontSize || 24}</span>
            <button
              onClick={() => onUpdate({ fontSize: Math.min(96, (element.fontSize || 24) + 2) })}
              className="w-5 h-5 flex items-center justify-center font-bold text-neutral-600 hover:bg-white rounded"
              title="Increase Size"
            >
              +
            </button>
          </div>

          {/* Bold, Italic, Underline */}
          <div className="flex items-center gap-0.5 border-l border-neutral-200 pl-1">
            <button
              onClick={() =>
                onUpdate({ fontWeight: element.fontWeight === 'bold' ? 'normal' : 'bold' })
              }
              className={`p-1.5 rounded-lg transition-colors ${
                element.fontWeight === 'bold' ? 'bg-rose-50 text-rose-600 font-bold' : 'hover:bg-neutral-100'
              }`}
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() =>
                onUpdate({ fontStyle: element.fontStyle === 'italic' ? 'normal' : 'italic' })
              }
              className={`p-1.5 rounded-lg transition-colors ${
                element.fontStyle === 'italic' ? 'bg-rose-50 text-rose-600' : 'hover:bg-neutral-100'
              }`}
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() =>
                onUpdate({
                  textDecoration: element.textDecoration === 'underline' ? 'none' : 'underline',
                })
              }
              className={`p-1.5 rounded-lg transition-colors ${
                element.textDecoration === 'underline'
                  ? 'bg-rose-50 text-rose-600'
                  : 'hover:bg-neutral-100'
              }`}
              title="Underline"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}

      {/* 2. SHAPE CONTROLS */}
      {(element.type === 'shape' || element.type === 'badge') && (
        <div className="relative">
          <button
            onClick={toggleShapePicker}
            className="flex min-h-[36px] items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200/80 px-2 py-1 rounded-lg font-semibold text-xs capitalize"
          >
            <Shapes className="w-3.5 h-3.5 text-rose-500" />
            <span>{element.shapeType || 'Shape'}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {showShapePicker && (
            <div
              className="absolute bottom-full left-1/2 z-50 mb-2 w-40 max-h-[220px] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-xl border border-neutral-200 bg-white/95 shadow-xl p-1.5 animate-in fade-in"
              style={{ maxWidth: isMobile ? 'calc(100vw - 52px)' : undefined }}
            >
              <div className="grid grid-cols-2 gap-1">
                {shapes.map((s) => (
                  <button
                    key={s.type}
                    onClick={() => {
                      onUpdate({ shapeType: s.type });
                      setShowShapePicker(false);
                    }}
                    className={`rounded-lg p-1.5 text-left text-[11px] font-semibold hover:bg-neutral-100 ${
                      element.shapeType === s.type ? 'bg-rose-50 text-rose-600' : 'text-neutral-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. COLOR PALETTE */}
      <div className="relative border-l border-neutral-200 pl-1">
        <button
          onClick={toggleColorPicker}
          className="flex min-h-[36px] items-center gap-1 rounded-lg p-1.5 hover:bg-neutral-100"
          title="Color Settings"
        >
          <div
            className="w-4 h-4 rounded-full border border-neutral-300 shadow-2xs"
            style={{ backgroundColor: element.fill || '#000000' }}
          />
          <Palette className="w-3.5 h-3.5 text-neutral-500" />
        </button>

        {showColorPicker && (
          <div
            className="absolute bottom-full left-1/2 z-50 mb-2 w-44 max-h-[220px] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-xl border border-neutral-200 bg-white/95 shadow-xl p-2.5 animate-in fade-in"
            style={{ maxWidth: isMobile ? 'calc(100vw - 50px)' : undefined }}
          >
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-500">Fill Color</span>
            <div className="flex flex-wrap gap-1.5">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => onUpdate({ fill: c })}
                  className={`h-6 w-6 rounded-full border ${
                    element.fill === c ? 'scale-110 ring-2 ring-rose-500' : 'border-neutral-200'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="color"
                value={element.fill || '#000000'}
                onChange={(e) => onUpdate({ fill: e.target.value })}
                className="h-6 w-6 cursor-pointer rounded-full border-0 bg-transparent"
              />
            </div>

            {element.type === 'text' && (
              <div className="mt-2 border-t border-neutral-150 pt-2">
                <span className="mb-1 block text-[11px] font-bold text-neutral-500">Outline Stroke</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={element.stroke || '#FFFFFF'}
                    onChange={(e) => onUpdate({ stroke: e.target.value })}
                    className="h-5 w-5 cursor-pointer rounded-full bg-transparent"
                  />
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={element.strokeWidth || 0}
                    onChange={(e) => onUpdate({ strokeWidth: Number(e.target.value) })}
                    className="h-1 w-24 accent-rose-500 rounded bg-neutral-200"
                  />
                  <span className="text-[10px] text-neutral-500">{element.strokeWidth || 0}px</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. ROTATION & FLIP QUICK CONTROLS */}
      <div className="relative border-l border-neutral-200 pl-1">
        <button
          onClick={() => setShowRotateMenu(!showRotateMenu)}
          className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600"
          title="Rotate & Flip"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {showRotateMenu && (
          <div
            className={`absolute ${isMobile ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : 'top-full left-0 mt-2'} bg-white rounded-xl shadow-xl border border-neutral-200 p-2 w-40 z-50 animate-in fade-in space-y-1`}
            style={{ maxWidth: isMobile ? 'calc(100vw - 40px)' : undefined }}
          >
            <button
              onClick={() => {
                onUpdate({ angle: ((element.angle || 0) + 90) % 360 });
                setShowRotateMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate 90°</span>
            </button>
            <button
              onClick={() => {
                onUpdate({ angle: 0 });
                setShowRotateMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Reset 0°</span>
            </button>
            <button
              onClick={() => {
                onUpdate({ flipH: !element.flipH });
                setShowRotateMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span>Flip Horizontal</span>
            </button>
            <button
              onClick={() => {
                onUpdate({ flipV: !element.flipV });
                setShowRotateMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <FlipVertical className="w-3.5 h-3.5" />
              <span>Flip Vertical</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. IMAGE CONTROLS */}
      {element.type === 'image' && (
        <div className="flex items-center gap-1">
          {onReplaceImage && (
            <button
              onClick={() => onReplaceImage(element.id)}
              className="flex items-center gap-1 bg-rose-500 text-white hover:bg-rose-600 px-2 py-1 rounded-lg text-xs font-bold transition-colors shadow-2xs"
              title="Replace photo with your own"
            >
              <ImagePlus className="w-3 h-3" />
              <span>Replace</span>
            </button>
          )}

          {onTriggerBgRemoval && (
            <button
              onClick={onTriggerBgRemoval}
              className="flex items-center gap-1 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-2 py-1 rounded-lg text-xs font-semibold transition-colors"
              title="Re-run Background Removal"
            >
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>Cutout</span>
            </button>
          )}
        </div>
      )}

      {/* 6. LAYER ORDERING */}
      <div className="relative border-l border-neutral-200 pl-1">
        <button
          onClick={() => setShowLayerMenu(!showLayerMenu)}
          className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600"
          title="Layer Position"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        {showLayerMenu && (
          <div
            className={`absolute ${isMobile ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : 'top-full left-0 mt-2'} bg-white rounded-xl shadow-xl border border-neutral-200 p-1.5 w-36 z-50 animate-in fade-in space-y-0.5`}
            style={{ maxWidth: isMobile ? 'calc(100vw - 40px)' : undefined }}
          >
            <button
              onClick={() => {
                onLayerOrder('front');
                setShowLayerMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded text-xs font-semibold"
            >
              Bring to Front
            </button>
            <button
              onClick={() => {
                onLayerOrder('up');
                setShowLayerMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded text-xs font-semibold"
            >
              Bring Forward (+1)
            </button>
            <button
              onClick={() => {
                onLayerOrder('down');
                setShowLayerMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded text-xs font-semibold"
            >
              Send Backward (-1)
            </button>
            <button
              onClick={() => {
                onLayerOrder('back');
                setShowLayerMenu(false);
              }}
              className="w-full text-left p-1.5 hover:bg-neutral-100 rounded text-xs font-semibold"
            >
              Send to Back
            </button>
          </div>
        )}
      </div>

      {/* 7. DUPLICATE & DELETE */}
      <div className="flex items-center gap-0.5 border-l border-neutral-200 pl-1">
        <button
          onClick={onDuplicate}
          className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600"
          title="Duplicate Element"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onDelete}
          className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
          title="Delete Element"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      </div>
    </div>
  );
};
