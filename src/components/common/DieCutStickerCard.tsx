import React from 'react';
import { StickerTemplate, PageRoute } from '../../types/sticker';
import { StickerDieCutGraphic } from './StickerDieCutGraphic';
import { ZoomIn, Flame, Sparkles } from 'lucide-react';

interface DieCutStickerCardProps {
  template: StickerTemplate;
  onNavigate?: (route: PageRoute) => void;
  onQuickPreview?: (template: StickerTemplate) => void;
}

export const DieCutStickerCard: React.FC<DieCutStickerCardProps> = ({
  template,
  onNavigate,
  onQuickPreview,
}) => {
  const handleCardClick = () => {
    if (onQuickPreview) {
      onQuickPreview(template);
    } else if (onNavigate) {
      onNavigate({ type: 'editor', templateId: template.id, category: template.category });
    }
  };

  const handleCustomizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate({ type: 'editor', templateId: template.id, category: template.category });
    } else if (onQuickPreview) {
      onQuickPreview(template);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between h-full cursor-pointer"
      id={`sticker-card-${template.id}`}
    >
      {/* Sticker Stage (Soft Transparent Checkerboard) */}
      <div className="aspect-square checkerboard-bg p-6 sm:p-7 flex items-center justify-center relative overflow-hidden select-none border-b border-neutral-100">
        {/* Single Top-Left Badge (At most 1 badge per card) */}
        <div className="absolute top-3 left-3 z-10">
          {template.isTrending ? (
            <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
              <Flame className="w-3 h-3 fill-white" />
              <span>Trending</span>
            </span>
          ) : (
            <span className="inline-flex items-center bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md capitalize shadow-2xs">
              {template.category === 'urdu' ? 'Urdu' : template.category}
            </span>
          )}
        </div>

        {/* Quick Preview Hover Trigger Overlay */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickPreview?.(template);
          }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/10 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          title="Quick preview sticker"
        >
          <span className="inline-flex items-center gap-1.5 bg-white text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200 border border-neutral-200">
            <ZoomIn className="w-3.5 h-3.5 text-rose-500" />
            <span>Quick Preview</span>
          </span>
        </button>

        {/* Authentic Subject-Contour Die-Cut Vector Sticker */}
        <div className="w-full h-full flex items-center justify-center">
          <StickerDieCutGraphic
            template={template}
            size={180}
            className="transform transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Card Details & Quick Customize Action */}
      <div className="p-3.5 sm:p-4 flex flex-col gap-2.5 bg-white">
        <div>
          <h3 className="font-bold text-sm text-neutral-900 line-clamp-1 group-hover:text-rose-600 transition-colors" title={template.title}>
            {template.title}
          </h3>
          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {template.description || `${template.borderWidth}px Die-Cut Contour • High-Res PNG`}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCustomizeClick}
          className="w-full py-1.5 px-3 bg-neutral-50 hover:bg-rose-500 hover:text-white text-neutral-700 text-xs font-bold rounded-xl border border-neutral-200 hover:border-rose-500 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 group-hover:text-white" />
          <span>Customize Sticker</span>
        </button>
      </div>
    </div>
  );
};
