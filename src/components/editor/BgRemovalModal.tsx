import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, Check, X, RotateCcw } from 'lucide-react';
import { removeBackgroundLocally } from '../../utils/canvasHelper';

interface BgRemovalModalProps {
  isOpen: boolean;
  rawImageSrc: string | null;
  onClose: () => void;
  onApply: (processedSrc: string, options?: { backgroundRemoved: boolean; originalSrc: string }) => void;
}

export const BgRemovalModal: React.FC<BgRemovalModalProps> = ({
  isOpen,
  rawImageSrc,
  onClose,
  onApply,
}) => {
  const [tolerance, setTolerance] = useState<number>(45);
  const [cutoutSrc, setCutoutSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<'split' | 'cutout' | 'original'>('split');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [backgroundRemovalMode, setBackgroundRemovalMode] = useState<'remove' | 'keep'>('remove');

  useEffect(() => {
    if (!rawImageSrc || !isOpen) return;

    let isMounted = true;
    setIsProcessing(true);

    const timer = setTimeout(async () => {
      try {
        const result = await removeBackgroundLocally(rawImageSrc, tolerance);
        if (isMounted) {
          setCutoutSrc(result);
          setIsProcessing(false);
        }
      } catch (err) {
        if (isMounted) {
          setCutoutSrc(rawImageSrc);
          setIsProcessing(false);
        }
      }
    }, 120);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [rawImageSrc, tolerance, isOpen]);

  if (!isOpen || !rawImageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 border border-neutral-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-neutral-900">Smart Background Removal & Cutout</h3>
              <p className="text-xs text-neutral-500">Preview and fine-tune transparent sticker edges</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setBackgroundRemovalMode('remove')}
              className={`rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${
                backgroundRemovalMode === 'remove'
                  ? 'border-rose-200 bg-rose-50 text-rose-700 shadow-xs'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Remove Background
            </button>
            <button
              type="button"
              onClick={() => setBackgroundRemovalMode('keep')}
              className={`rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${
                backgroundRemovalMode === 'keep'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-xs'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Keep Original Background
            </button>
          </div>
          <p className="text-xs text-neutral-500">Tip: Keep the background for meme-style stickers.</p>
        </div>

        {/* Preview Container */}
        <div className="flex-1 min-h-[260px] max-h-[360px] bg-neutral-100 rounded-xl overflow-hidden relative flex items-center justify-center checkerboard-bg border border-neutral-200">
          {previewMode === 'split' ? (
            <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
              {/* Processed (Left / Full behind) */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                {cutoutSrc && (
                  <img
                    src={cutoutSrc}
                    alt="Background Cutout Preview"
                    className="max-w-full max-h-full object-contain filter drop-shadow-md"
                  />
                )}
              </div>

              {/* Original (Clipped on Right) */}
              <div
                className="absolute inset-0 flex items-center justify-center p-4 bg-white/40 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <img
                  src={rawImageSrc}
                  alt="Original Image"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Split Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-rose-500 text-white shadow-lg flex items-center justify-center text-[10px] font-bold">
                  ↔
                </div>
              </div>

              {/* Slider overlay input for mouse/touch dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
              />

              <div className="absolute top-2 left-2 bg-neutral-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                Cutout (Transparent)
              </div>
              <div className="absolute top-2 right-2 bg-neutral-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                Original Photo
              </div>
            </div>
          ) : previewMode === 'cutout' ? (
            <div className="p-4 flex items-center justify-center w-full h-full">
              {cutoutSrc && (
                <img
                  src={cutoutSrc}
                  alt="Transparent Cutout"
                  className="max-w-full max-h-full object-contain filter drop-shadow-md"
                />
              )}
            </div>
          ) : (
            <div className="p-4 flex items-center justify-center w-full h-full">
              <img
                src={rawImageSrc}
                alt="Original"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center gap-2 text-rose-600 font-bold text-xs">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Detecting edges & removing background...</span>
            </div>
          )}
        </div>

        {/* View Mode Toggle & Fine Tuning Sliders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg text-xs font-semibold text-neutral-600">
              <button
                onClick={() => setPreviewMode('split')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  previewMode === 'split' ? 'bg-white text-rose-600 shadow-xs' : 'hover:text-neutral-900'
                }`}
              >
                Split Compare
              </button>
              <button
                onClick={() => setPreviewMode('cutout')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  previewMode === 'cutout' ? 'bg-white text-rose-600 shadow-xs' : 'hover:text-neutral-900'
                }`}
              >
                Cutout Only
              </button>
              <button
                onClick={() => setPreviewMode('original')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  previewMode === 'original' ? 'bg-white text-rose-600 shadow-xs' : 'hover:text-neutral-900'
                }`}
              >
                Original Photo
              </button>
            </div>

            <button
              onClick={() => setTolerance(45)}
              className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1 font-medium"
              title="Reset Tolerance"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Tolerance Slider */}
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-rose-500" />
                <span>Edge Cutout Sensitivity / Tolerance</span>
              </span>
              <span className="text-rose-600">{tolerance}</span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              value={tolerance}
              onChange={(e) => setTolerance(Number(e.target.value))}
              className="w-full accent-rose-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>Precise / Retain subtle details</span>
              <span>Default (45)</span>
              <span>Aggressive background strip</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
          <button
            onClick={() => {
              onApply(rawImageSrc, { backgroundRemoved: false, originalSrc: rawImageSrc });
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              backgroundRemovalMode === 'keep'
                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Keep Original Background
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const finalSrc = backgroundRemovalMode === 'keep' ? rawImageSrc : cutoutSrc || rawImageSrc;
                onApply(finalSrc, {
                  backgroundRemoved: backgroundRemovalMode === 'remove',
                  originalSrc: rawImageSrc,
                });
                onClose();
              }}
              className="inline-flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{backgroundRemovalMode === 'keep' ? 'Add Full Photo to Sticker' : 'Add Cutout to Sticker'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
