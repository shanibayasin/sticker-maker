import React, { useState } from 'react';
import { PageRoute, StickerCategory, StickerTemplate } from '../../types/sticker';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { STICKER_TEMPLATES } from '../../data/templatesData';
import { DieCutStickerCard } from '../common/DieCutStickerCard';
import { StickerPreviewModal } from '../common/StickerPreviewModal';
import { 
  Scissors, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Download, 
  HelpCircle,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface CategoryPageProps {
  category: StickerCategory;
  onNavigate: (route: PageRoute) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onNavigate }) => {
  const data = CATEGORIES_DATA[category] || CATEGORIES_DATA['whatsapp'];
  const categoryTemplates = STICKER_TEMPLATES.filter((t) => t.category === category);
  const [previewTemplate, setPreviewTemplate] = useState<StickerTemplate | null>(null);

  // Fallback to all templates if category has few
  const displayTemplates = categoryTemplates.length > 0 
    ? categoryTemplates 
    : STICKER_TEMPLATES.slice(0, 4);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Hero / Header */}
      <section className="w-full bg-gradient-to-b from-rose-50/60 via-white to-white py-10 sm:py-14 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-6 flex-wrap">
            <button onClick={() => onNavigate({ type: 'home' })} className="hover:text-neutral-700 transition-colors">Home</button>
            <span>/</span>
            <span className="text-neutral-500">Sticker Maker</span>
            <span>/</span>
            <span className="text-rose-600 capitalize font-bold">{data.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{data.badge} • Programmatic Collection</span>
              </div>

              {/* Dynamic H1 */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                {data.h1}
              </h1>

              {/* 150-200 word Unique SEO Intro Paragraph */}
              <div className="prose prose-neutral text-sm sm:text-base text-neutral-600 leading-relaxed whitespace-pre-line">
                {data.intro}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3">
                <button
                  id={`cat-hero-cta-${category}`}
                  onClick={() => onNavigate({ type: 'editor', category: category })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-98 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:shadow transition-all min-h-[44px]"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Start Making {data.name} Stickers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('category-templates-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors min-h-[44px]"
                >
                  <span>Browse Templates</span>
                </button>
              </div>
            </div>

            {/* Technical Specifications Card */}
            <div className="lg:col-span-4 bg-neutral-50 rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm pb-2 border-b border-neutral-200">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Technical Specifications</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-neutral-400 font-medium">Recommended Dimensions:</span>
                  <p className="font-bold text-neutral-800 text-sm mt-0.5">{data.specs.recommendedSize}</p>
                </div>
                <div>
                  <span className="text-neutral-400 font-medium">Export Formats:</span>
                  <p className="font-bold text-neutral-800 mt-0.5">{data.specs.format}</p>
                </div>
                <div>
                  <span className="text-neutral-400 font-medium">Resolution & Print DPI:</span>
                  <p className="font-bold text-neutral-800 mt-0.5">{data.specs.dpi}</p>
                </div>
                <div>
                  <span className="text-neutral-400 font-medium">Primary Use Cases:</span>
                  <p className="font-bold text-neutral-800 mt-0.5">{data.specs.useCase}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" /> No Signup Required
                </span>
                <span>Instant Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Template Grid */}
      <section id="category-templates-grid" className="w-full py-12 sm:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Ready-Made Presets</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                {data.name} Sticker Templates
              </h2>
            </div>
            <button
              onClick={() => onNavigate({ type: 'editor', category: category })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2.5 rounded-xl border border-rose-200 transition-colors min-h-[44px] self-start sm:self-auto"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Open Custom Canvas</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayTemplates.map((template) => (
              <DieCutStickerCard
                key={template.id}
                template={template}
                onNavigate={onNavigate}
                onQuickPreview={(t) => setPreviewTemplate(t)}
              />
            ))}
          </div>

          {/* Link to Full Template Library */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between flex-wrap gap-4 text-xs">
            <span className="text-neutral-500">Looking for more styles, aesthetics, or memes?</span>
            <button
              onClick={() => onNavigate({ type: 'templates' })}
              className="inline-flex items-center gap-1.5 font-bold text-rose-600 hover:text-rose-700 hover:underline"
            >
              <span>Explore All {STICKER_TEMPLATES.length}+ Templates in Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Preview Modal */}
          <StickerPreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* Sample Ideas & Prompts */}
      <section className="w-full py-16 bg-[#F9FAFB] border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Design Inspiration</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Creative Ideas for {data.name} Stickers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.samplePrompts.map((prompt, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-neutral-200 flex items-start gap-3 shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 font-extrabold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">{prompt}</p>
                  <button
                    onClick={() => onNavigate({ type: 'editor', category: category })}
                    className="mt-2 text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <span>Create this sticker</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Specific FAQs */}
      <section className="w-full py-16 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Expert Advice</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {data.name} Sticker FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-neutral-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking: 3 Related Category Pages */}
      <section className="w-full py-14 bg-[#FBFBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Related Collections</span>
            <h3 className="text-xl font-bold text-neutral-900 mt-1">Explore Other Sticker Makers</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {data.relatedCategories.map((relatedCat) => {
              const relData = CATEGORIES_DATA[relatedCat];
              if (!relData) return null;
              return (
                <div
                  key={relatedCat}
                  id={`related-cat-card-${relatedCat}`}
                  onClick={() => onNavigate({ type: 'category', category: relatedCat })}
                  className="bg-white p-6 rounded-2xl border border-neutral-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                      {relData.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-base text-neutral-900 group-hover:text-rose-600 transition-colors">
                    {relData.name} Sticker Maker
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {relData.intro.slice(0, 120)}...
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
