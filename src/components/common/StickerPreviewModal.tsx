import React from 'react';
import { StickerTemplate, PageRoute } from '../../types/sticker';
import { StickerDieCutGraphic } from './StickerDieCutGraphic';
import { X, Scissors, Flame, Check, Sparkles } from 'lucide-react';

interface StickerPreviewModalProps {
  template: StickerTemplate | null;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const StickerPreviewModal: React.FC<StickerPreviewModalProps> = ({
  template,
  onClose,
  onNavigate,
}) => {
  if (!template) return null;

  const formatUses = (uses?: number) => {
    if (!uses) return '2.5k';
    if (uses >= 1000) {
      return `${(uses / 1000).toFixed(1)}k`;
    }
    return `${uses}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-100 text-neutral-700 text-xs font-semibold px-2.5 py-1 rounded-md capitalize">
              {template.category === 'urdu' ? 'Urdu Nastaliq' : template.category}
            </span>
            {template.isTrending && (
              <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 fill-white" />
                <span>Trending</span>
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Large Subject-Contour Die-Cut Sticker Stage */}
          <div className="aspect-square max-h-[280px] w-full checkerboard-bg rounded-xl p-6 flex items-center justify-center relative overflow-hidden border border-neutral-200">
            <StickerDieCutGraphic
              template={template}
              size={230}
              className="transform hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Details & Specifications */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                {template.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                {template.description || 'Pre-designed vector template with customizable vinyl outline, typography, and one-click export.'}
              </p>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="bg-neutral-50 border border-neutral-200/70 rounded-xl p-2.5 text-xs">
                <span className="text-neutral-400 block text-[10px] font-medium uppercase">Contour</span>
                <span className="font-semibold text-neutral-800 flex items-center gap-1 mt-0.5 text-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{template.borderWidth}px White Halo</span>
                </span>
              </div>

              <div className="bg-neutral-50 border border-neutral-200/70 rounded-xl p-2.5 text-xs">
                <span className="text-neutral-400 block text-[10px] font-medium uppercase">Export</span>
                <span className="font-semibold text-neutral-800 flex items-center gap-1 mt-0.5 text-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>300 DPI PNG</span>
                </span>
              </div>

              <div className="bg-neutral-50 border border-neutral-200/70 rounded-xl p-2.5 text-xs">
                <span className="text-neutral-400 block text-[10px] font-medium uppercase">Popularity</span>
                <span className="font-semibold text-neutral-800 flex items-center gap-1 mt-0.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{formatUses(template.uses)} uses</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-100 transition-colors"
          >
            Close
          </button>

          <button
            id={`modal-customize-${template.id}`}
            onClick={() => {
              onClose();
              onNavigate({ type: 'editor', templateId: template.id, category: template.category });
            }}
            className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all"
          >
            <Scissors className="w-4 h-4" />
            <span>Customize in Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
