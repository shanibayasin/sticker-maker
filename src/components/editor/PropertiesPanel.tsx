import React, { useRef } from 'react';
import { 
  Type, 
  ImageIcon, 
  Shapes, 
  Layers, 
  Copy, 
  Trash2, 
  FlipHorizontal, 
  FlipVertical, 
  Sparkles, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline,
  ImagePlus,
  RefreshCw
} from 'lucide-react';
import { CanvasElement } from '../../types/sticker';
import { FontPicker } from './FontPicker';
import { isUrduFontFamily, hasRtlCharacters } from '../../data/fontsData';

interface PropertiesPanelProps {
  selectedElement: CanvasElement | null;
  elements: CanvasElement[];
  onSelectElement: (id: string | null) => void;
  onUpdateSelected: (props: Partial<CanvasElement>) => void;
  onDuplicateSelected: () => void;
  onDeleteSelected: () => void;
  onLayerOrder: (direction: 'up' | 'down' | 'front' | 'back') => void;
  onTriggerBgRemoval: () => void;
  onReplaceImage?: (elementId?: string) => void;
  borderWidth: number;
  onBorderWidthChange: (w: number) => void;
  borderColor: string;
  onBorderColorChange: (c: string) => void;
  hasShadow: boolean;
  onHasShadowToggle: () => void;
  onCloseMobile?: () => void;
  isMobileModal?: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedElement,
  elements,
  onSelectElement,
  onUpdateSelected,
  onDuplicateSelected,
  onDeleteSelected,
  onLayerOrder,
  onTriggerBgRemoval,
  onReplaceImage,
  borderWidth,
  onBorderWidthChange,
  borderColor,
  onBorderColorChange,
  hasShadow,
  onHasShadowToggle,
  onCloseMobile,
  isMobileModal = false,
}) => {
  const colors = [
    '#000000', '#FFFFFF', '#F43F5E', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#78350F'
  ];

  const shapes = [
    { type: 'circle', label: 'Circle' },
    { type: 'rounded-rect', label: 'Rounded Rect' },
    { type: 'pill', label: 'Pill Badge' },
    { type: 'star', label: 'Star (5-pt)' },
    { type: 'starburst', label: 'Starburst' },
    { type: 'bubble', label: 'Speech Bubble' },
    { type: 'arch', label: 'Arch' },
  ];

  return (
    <aside 
      aria-label="Properties and Layers Panel" 
      className={
        isMobileModal
          ? "w-full max-h-[80vh] bg-white rounded-t-3xl p-5 space-y-5 overflow-y-auto z-50 select-none shadow-2xl border-t border-neutral-200"
          : "w-72 bg-white border-l border-neutral-200 p-4 space-y-5 overflow-y-auto hidden lg:block z-20 shrink-0 select-none"
      }
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-150">
        <span className="font-extrabold text-xs uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-rose-500" />
          <span>{selectedElement ? 'Element Inspector' : 'Layer Stack'}</span>
        </span>
        <div className="flex items-center gap-2">
          {selectedElement && (
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md capitalize border border-rose-200">
              {selectedElement.type}
            </span>
          )}
          {onCloseMobile && isMobileModal && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg min-h-[32px] min-w-[32px] flex items-center justify-center"
              title="Close Panel"
            >
              <Trash2 className="w-4 h-4 hidden" />
              <span className="text-xs font-bold text-neutral-600">Done</span>
            </button>
          )}
        </div>
      </div>

      {selectedElement ? (
        <div className="space-y-4">
          {/* 1. TEXT PROPERTIES */}
          {selectedElement.type === 'text' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-700">Text Content</label>
                  {(isUrduFontFamily(selectedElement.fontFamily) || hasRtlCharacters(selectedElement.content)) && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                      RTL (اردو)
                    </span>
                  )}
                </div>
                <textarea
                  value={selectedElement.content || ''}
                  onChange={(e) => onUpdateSelected({ content: e.target.value })}
                  rows={2}
                  dir={isUrduFontFamily(selectedElement.fontFamily) || hasRtlCharacters(selectedElement.content) ? 'rtl' : 'ltr'}
                  className={`w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isUrduFontFamily(selectedElement.fontFamily) ? 'font-urdu text-sm' : ''
                  }`}
                  style={{ fontFamily: `"${selectedElement.fontFamily || 'Fredoka'}", sans-serif` }}
                />
              </div>

              {/* Font Family */}
              <div className="space-y-1">
                <span className="text-[11px] text-neutral-500 font-medium">Font Family</span>
                <FontPicker
                  value={selectedElement.fontFamily || 'Fredoka'}
                  onChange={(fontName, isRtl) =>
                    onUpdateSelected({
                      fontFamily: fontName,
                      ...(isRtl && !selectedElement.textAlign ? { textAlign: 'right' } : {}),
                    })
                  }
                  className="w-full"
                  triggerClassName="w-full justify-between p-2 rounded-xl"
                  popoverPlacement="bottom-start"
                />
              </div>

              {/* Font Size Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Font Size</span>
                  <span className="font-bold text-neutral-800">{selectedElement.fontSize || 24}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  value={selectedElement.fontSize || 24}
                  onChange={(e) => onUpdateSelected({ fontSize: Number(e.target.value) })}
                  className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Font Styling & Alignment */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 bg-neutral-50 p-1 rounded-lg border border-neutral-200">
                  <button
                    onClick={() =>
                      onUpdateSelected({
                        fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold',
                      })
                    }
                    className={`p-1.5 rounded ${
                      selectedElement.fontWeight === 'bold'
                        ? 'bg-white text-rose-600 shadow-2xs font-bold'
                        : 'text-neutral-600 hover:bg-neutral-200/60'
                    }`}
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      onUpdateSelected({
                        fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic',
                      })
                    }
                    className={`p-1.5 rounded ${
                      selectedElement.fontStyle === 'italic'
                        ? 'bg-white text-rose-600 shadow-2xs'
                        : 'text-neutral-600 hover:bg-neutral-200/60'
                    }`}
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      onUpdateSelected({
                        textDecoration:
                          selectedElement.textDecoration === 'underline' ? 'none' : 'underline',
                      })
                    }
                    className={`p-1.5 rounded ${
                      selectedElement.textDecoration === 'underline'
                        ? 'bg-white text-rose-600 shadow-2xs'
                        : 'text-neutral-600 hover:bg-neutral-200/60'
                    }`}
                    title="Underline"
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-neutral-50 p-1 rounded-lg border border-neutral-200">
                  <button
                    onClick={() => onUpdateSelected({ textAlign: 'left' })}
                    className={`p-1.5 rounded ${
                      selectedElement.textAlign === 'left'
                        ? 'bg-white text-rose-600 shadow-2xs'
                        : 'text-neutral-600 hover:bg-neutral-200/60'
                    }`}
                    title="Align Left"
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onUpdateSelected({ textAlign: 'center' })}
                    className={`p-1.5 rounded ${
                      !selectedElement.textAlign || selectedElement.textAlign === 'center'
                        ? 'bg-white text-rose-600 shadow-2xs'
                        : 'text-neutral-600 hover:bg-neutral-200/60'
                    }`}
                    title="Align Center"
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onUpdateSelected({ textAlign: 'right' })}
                    className={`p-1.5 rounded ${
                      selectedElement.textAlign === 'right'
                        ? 'bg-white text-rose-600 shadow-2xs'
                        : 'text-neutral-600 hover:bg-neutral-200/60'
                    }`}
                    title="Align Right"
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. IMAGE FILTERS & ADJUSTMENTS */}
          {selectedElement.type === 'image' && (
            <div className="space-y-3">
              {/* Replace Image Action */}
              {onReplaceImage && (
                <button
                  type="button"
                  onClick={() => onReplaceImage(selectedElement.id)}
                  className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold p-2.5 rounded-xl shadow-xs transition-colors"
                >
                  <ImagePlus className="w-4 h-4" />
                  <span>Replace Photo / Image</span>
                </button>
              )}

              <button
                type="button"
                onClick={onTriggerBgRemoval}
                className="w-full flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 text-xs font-semibold p-2 rounded-xl transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Re-run Background Removal</span>
              </button>

              {/* Opacity */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Opacity</span>
                  <span className="font-bold text-neutral-800">
                    {Math.round((selectedElement.opacity ?? 1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={selectedElement.opacity ?? 1}
                  onChange={(e) => onUpdateSelected({ opacity: Number(e.target.value) })}
                  className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Brightness Filter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Brightness</span>
                  <span className="font-bold text-neutral-800">
                    {selectedElement.filterBrightness ?? 100}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={selectedElement.filterBrightness ?? 100}
                  onChange={(e) => onUpdateSelected({ filterBrightness: Number(e.target.value) })}
                  className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Contrast Filter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Contrast</span>
                  <span className="font-bold text-neutral-800">
                    {selectedElement.filterContrast ?? 100}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={selectedElement.filterContrast ?? 100}
                  onChange={(e) => onUpdateSelected({ filterContrast: Number(e.target.value) })}
                  className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Saturation Filter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Saturation</span>
                  <span className="font-bold text-neutral-800">
                    {selectedElement.filterSaturation ?? 100}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={selectedElement.filterSaturation ?? 100}
                  onChange={(e) => onUpdateSelected({ filterSaturation: Number(e.target.value) })}
                  className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Blur Filter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Blur Softness</span>
                  <span className="font-bold text-neutral-800">
                    {selectedElement.filterBlur ?? 0}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={selectedElement.filterBlur ?? 0}
                  onChange={(e) => onUpdateSelected({ filterBlur: Number(e.target.value) })}
                  className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Quick Flip */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onUpdateSelected({ flipH: !selectedElement.flipH })}
                  className={`p-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                    selectedElement.flipH
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                  <span>Flip H</span>
                </button>
                <button
                  onClick={() => onUpdateSelected({ flipV: !selectedElement.flipV })}
                  className={`p-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                    selectedElement.flipV
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <FlipVertical className="w-3.5 h-3.5" />
                  <span>Flip V</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. SHAPE & BADGE CONTROLS */}
          {(selectedElement.type === 'shape' || selectedElement.type === 'badge') && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">Shape Form</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {shapes.map((s) => (
                    <button
                      key={s.type}
                      onClick={() => onUpdateSelected({ shapeType: s.type })}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all text-left truncate ${
                        selectedElement.shapeType === s.type
                          ? 'bg-rose-50 border-rose-300 text-rose-600 font-bold'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COLOR CONTROLS */}
          {selectedElement.type !== 'image' && (
            <div className="space-y-2 pt-2 border-t border-neutral-150">
              <span className="text-xs font-bold text-neutral-700">Fill Color</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdateSelected({ fill: c })}
                    className={`w-6 h-6 rounded-full border transition-transform ${
                      selectedElement.fill === c ? 'ring-2 ring-rose-500 scale-110' : 'border-neutral-200'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
                <input
                  type="color"
                  value={selectedElement.fill || '#000000'}
                  onChange={(e) => onUpdateSelected({ fill: e.target.value })}
                  className="w-6 h-6 rounded-full cursor-pointer bg-transparent"
                />
              </div>
            </div>
          )}

          {/* ROTATION ANGLE */}
          <div className="space-y-1 pt-2 border-t border-neutral-150">
            <div className="flex justify-between text-[11px]">
              <span className="font-bold text-neutral-700">Rotation Angle</span>
              <span className="text-neutral-500">{Math.round(selectedElement.angle || 0)}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              value={selectedElement.angle || 0}
              onChange={(e) => onUpdateSelected({ angle: Number(e.target.value) })}
              className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* LAYER REORDERING */}
          <div className="space-y-2 pt-2 border-t border-neutral-150">
            <span className="text-xs font-bold text-neutral-700">Layer Hierarchy</span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
              <button
                onClick={() => onLayerOrder('front')}
                className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 text-center"
                title="Bring to Front"
              >
                Front
              </button>
              <button
                onClick={() => onLayerOrder('up')}
                className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 text-center"
                title="Forward (+1)"
              >
                +1
              </button>
              <button
                onClick={() => onLayerOrder('down')}
                className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 text-center"
                title="Backward (-1)"
              >
                -1
              </button>
              <button
                onClick={() => onLayerOrder('back')}
                className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 text-center"
                title="Send to Back"
              >
                Back
              </button>
            </div>
          </div>

          {/* DUPLICATE & DELETE */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={onDuplicateSelected}
              className="flex items-center justify-center gap-1.5 p-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-xl border border-neutral-200 text-xs font-bold transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplicate</span>
            </button>
            <button
              onClick={onDeleteSelected}
              className="flex items-center justify-center gap-1.5 p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 text-xs font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ) : (
        /* NO SELECTION: DISPLAY LAYER STACK & QUICK SETTINGS */
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-700">Artwork Layers ({elements.length})</span>
            {elements.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">No layers yet. Add text, shapes, or upload an image.</p>
            ) : (
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {[...elements].reverse().map((elem, idx) => (
                  <div
                    key={elem.id}
                    onClick={() => onSelectElement(elem.id)}
                    className="p-2 bg-neutral-50 hover:bg-rose-50/60 border border-neutral-200 hover:border-rose-300 rounded-xl flex items-center justify-between cursor-pointer text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {elem.type === 'text' ? (
                        <Type className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      ) : elem.type === 'image' ? (
                        <ImageIcon className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      ) : (
                        <Shapes className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      )}
                      <span className="truncate font-semibold text-neutral-700">
                        {elem.content || elem.shapeType || `${elem.type} layer`}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 shrink-0">#{elements.length - idx}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticker Master Die-Cut Settings */}
          <div className="space-y-3 pt-3 border-t border-neutral-200">
            <span className="text-xs font-extrabold text-neutral-800">Master Die-Cut Outline</span>
            
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-neutral-700">Border Thickness</span>
                <span className="text-rose-600 font-bold">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                value={borderWidth}
                onChange={(e) => onBorderWidthChange(Number(e.target.value))}
                className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-xs font-bold text-neutral-800">3D Vinyl Shadow</span>
              <button
                onClick={onHasShadowToggle}
                className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                  hasShadow ? 'bg-rose-500' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    hasShadow ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
