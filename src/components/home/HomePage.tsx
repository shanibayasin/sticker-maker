import React, { useState } from 'react';
import { PageRoute, StickerCategory, StickerTemplate } from '../../types/sticker';
import { 
  HERO_COPY, 
  FEATURES_COPY, 
  HOW_IT_WORKS_STEPS, 
  FAQ_ITEMS 
} from '../../data/marketingData';
import { STICKER_TEMPLATES } from '../../data/templatesData';
import { DieCutStickerCard } from '../common/DieCutStickerCard';
import { StickerDieCutGraphic } from '../common/StickerDieCutGraphic';
import { StickerPreviewModal } from '../common/StickerPreviewModal';
import { 
  Sparkles, 
  Wand2, 
  Scissors, 
  Move, 
  Layers, 
  Download, 
  ArrowRight, 
  ChevronDown, 
  Search,
  Zap,
  RotateCcw,
  Flame,
  SlidersHorizontal,
  TrendingUp,
  Clock
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeTemplateCategory, setActiveTemplateCategory] = useState<StickerCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'trending' | 'newest'>('popular');
  const [previewTemplate, setPreviewTemplate] = useState<StickerTemplate | null>(null);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [heroBorderWidth, setHeroBorderWidth] = useState<number>(10);

  const heroPreviewTemplate = STICKER_TEMPLATES.find((template) => template.id === 'tmpl-funny-doge') ?? STICKER_TEMPLATES[0];

  // Icon mapper for feature blocks
  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Wand2': return <Wand2 className="w-5 h-5 text-rose-500" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-rose-500" />;
      case 'Move': return <Move className="w-5 h-5 text-rose-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-rose-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-rose-500" />;
      case 'Download': return <Download className="w-5 h-5 text-rose-500" />;
      default: return <Sparkles className="w-5 h-5 text-rose-500" />;
    }
  };

  // Filter templates by category
  const filteredByCategory = activeTemplateCategory === 'all'
    ? STICKER_TEMPLATES
    : STICKER_TEMPLATES.filter((t) => t.category === activeTemplateCategory);

  // Sort filtered templates
  const filteredTemplates = [...filteredByCategory].sort((a, b) => {
    if (sortBy === 'trending') {
      if (a.isTrending && !b.isTrending) return -1;
      if (!a.isTrending && b.isTrending) return 1;
      return (b.uses || 0) - (a.uses || 0);
    }
    if (sortBy === 'newest') {
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    }
    // Default 'popular'
    return (b.uses || 0) - (a.uses || 0);
  });

  const categories: { id: StickerCategory; label: string }[] = [
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'urdu', label: 'Urdu Nastaliq' },
    { id: 'funny', label: 'Funny' },
    { id: 'aesthetic', label: 'Aesthetic' },
    { id: 'logo', label: 'Logo' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'quotes', label: 'Quotes' },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) =>
    item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. HERO SECTION */}
      <section className="w-full bg-linear-to-b from-rose-50/70 via-white to-white pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
            <div className="space-y-6 max-w-2xl lg:max-w-none text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/90 border border-rose-200/80 text-rose-700 text-xs font-semibold shadow-2xs">
                <Zap className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>#1 Free Alternative to Canva Sticker Maker</span>
              </div>

              {/* Exact H1 Title */}
              <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.08]">
                Sticker Maker — Design Custom Stickers <span className="text-rose-500">Free in Seconds</span>
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed max-w-xl lg:max-w-none">
                {HERO_COPY.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch justify-start gap-3 pt-2 w-full max-w-xl">
                <button
                  id="hero-primary-cta-btn"
                  onClick={() => onNavigate({ type: 'editor' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all min-h-12"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{HERO_COPY.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-secondary-cta-btn"
                  onClick={() => onNavigate({ type: 'landing', slug: 'photo-to-sticker' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-rose-50 text-rose-700 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl border border-rose-300 hover:border-rose-400 transition-all shadow-2xs min-h-12"
                >
                  <span>Photo to Sticker</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => onNavigate({ type: 'landing', slug: 'meme-stickers' })}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-rose-700 hover:text-rose-800 transition-colors"
                >
                  <span>Making a meme? Try our dedicated Meme Sticker Maker</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Key Trust Signals (2x2 grid on mobile, 4 columns on tablet+) */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-neutral-200/90 max-w-xl lg:max-w-none text-left">
                {HERO_COPY.trustMetrics.map((metric, idx) => (
                  <div key={idx} className="p-2 sm:p-0">
                    <p className="text-xl sm:text-2xl font-extrabold text-neutral-900">{metric.value}</p>
                    <p className="text-xs text-neutral-500 font-medium">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="mx-auto max-w-[520px] rounded-[30px] border border-rose-100 bg-white p-4 sm:p-5 shadow-[0_25px_80px_rgba(244,63,94,0.10)] ring-1 ring-white/80">
                <div className="flex items-center justify-between gap-3 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
                    <span className="text-sm font-bold text-neutral-900">Live Die-Cut Preview</span>
                  </div>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-600">
                    Real-time
                  </span>
                </div>

                <div className="rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-rose-50 p-4 shadow-inner shadow-emerald-100/40">
                  <div className="aspect-[4/3] rounded-[20px] bg-white/70 flex items-center justify-center border border-white/70 shadow-sm">
                    <StickerDieCutGraphic
                      template={{
                        ...heroPreviewTemplate,
                        borderWidth: heroBorderWidth,
                        borderColor: '#FFFFFF',
                      }}
                      size={220}
                      className="drop-shadow-[0_16px_28px_rgba(15,23,42,0.12)]"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {['#F8FAFC', '#F9A8D4', '#86EFAC', '#FDE68A'].map((swatch) => (
                        <span
                          key={swatch}
                          className="h-6 w-6 rounded-full border border-neutral-200 shadow-2xs"
                          style={{ backgroundColor: swatch }}
                        />
                      ))}
                    </div>
                    <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-bold text-neutral-700">
                      {heroBorderWidth}px border
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <label htmlFor="hero-border-slider" className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                      Border thickness
                    </label>
                    <input
                      id="hero-border-slider"
                      type="range"
                      min={4}
                      max={20}
                      step={1}
                      value={heroBorderWidth}
                      onChange={(e) => setHeroBorderWidth(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <button
                    onClick={() => onNavigate({ type: 'editor' })}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-3 text-sm font-bold transition hover:bg-neutral-800"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Open Full Canvas Studio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 CORE FEATURES SECTION */}
      <section className="w-full py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Why Creators Choose StickerMaker
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Everything You Need to Make Viral Stickers
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Engineered with dedicated sticker algorithms instead of general-purpose photo tools. Faster, sharper, and calibrated for die-cut perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES_COPY.map((feature) => (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                className="bg-neutral-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-rose-200 hover:shadow-md transition-all group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-rose-50 border border-neutral-200 group-hover:border-rose-200 flex items-center justify-center shadow-2xs transition-colors">
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  {feature.badge && (
                    <span className="text-[11px] font-bold text-neutral-600 bg-white border border-neutral-200 px-2 py-0.5 rounded-full">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-rose-600 transition-colors">
                  {feature.headline}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TEMPLATE SHOWCASE & CATEGORY FILTER */}
      <section id="templates-section" className="w-full py-16 sm:py-20 bg-neutral-50/50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Template Library</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Trending Ready-to-Use Sticker Designs
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
                Pick a pre-made die-cut design or launch a fresh canvas. Every template features custom vinyl borders, scalable layers, and instant PNG/SVG export.
              </p>
            </div>

            <button
              onClick={() => onNavigate({ type: 'editor' })}
              className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-sm bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200 transition-all self-start md:self-auto min-h-11"
            >
              <Scissors className="w-4 h-4" />
              <span>Open Blank Canvas Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filter & Sort Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Category Filter Pills (horizontal scroll friendly on small screens) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <button
                onClick={() => setActiveTemplateCategory('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-10.5 shrink-0 flex items-center gap-1.5 ${
                  activeTemplateCategory === 'all'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                <span>All Templates</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTemplateCategory === 'all' ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {STICKER_TEMPLATES.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = STICKER_TEMPLATES.filter((t) => t.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTemplateCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-10.5 shrink-0 flex items-center gap-1.5 ${
                      activeTemplateCategory === cat.id
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeTemplateCategory === cat.id ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Secondary Sort Selector */}
            <div className="flex items-center gap-2 self-start lg:self-auto bg-white p-1 rounded-xl border border-neutral-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-neutral-400 pl-2 pr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Sort:</span>
              </span>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 min-h-8.5 ${
                  sortBy === 'popular'
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                <span>Most Popular</span>
              </button>
              <button
                onClick={() => setSortBy('trending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 min-h-8.5 ${
                  sortBy === 'trending'
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <Flame className="w-3 h-3 text-rose-400" />
                <span>Trending</span>
              </button>
              <button
                onClick={() => setSortBy('newest')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 min-h-8.5 ${
                  sortBy === 'newest'
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>Newest</span>
              </button>
            </div>
          </div>

          {/* Templates Grid or Empty State */}
          {filteredTemplates.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredTemplates.slice(0, 10).map((template) => (
                  <DieCutStickerCard
                    key={template.id}
                    template={template}
                    onNavigate={onNavigate}
                    onQuickPreview={(t) => setPreviewTemplate(t)}
                  />
                ))}
              </div>

              {/* Prominent View All Templates CTA */}
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  id="home-view-all-templates-btn"
                  onClick={() => onNavigate({ 
                    type: 'templates', 
                    category: activeTemplateCategory === 'all' ? undefined : activeTemplateCategory 
                  })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all min-h-12"
                >
                  <Layers className="w-5 h-5 text-rose-400" />
                  <span>View All Templates ({STICKER_TEMPLATES.length}+ Designs)</span>
                  <ArrowRight className="w-4 h-4 text-neutral-300" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 space-y-4 max-w-md mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-100">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-neutral-900">No templates found</h3>
                <p className="text-xs text-neutral-500">
                  Try switching category filters or create your custom sticker from scratch.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setActiveTemplateCategory('all')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors min-h-10.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Show All Templates</span>
                </button>
                <button
                  onClick={() => onNavigate({ type: 'editor' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-200 transition-colors min-h-10.5"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Open Blank Studio</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Preview Modal */}
          <StickerPreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 STEPS) */}
      <section className="w-full py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
              How to Create Custom Stickers in Minutes
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              No complex design software or prior graphic skills required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-neutral-50/70 rounded-2xl p-6 sm:p-8 border border-neutral-200 relative space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                  {step.step}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="w-full py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Got Questions? We’ve Got Answers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Clear answers to the most common questions about sticker sizes, formats, printing, and features.
            </p>

            {/* Quick search input */}
            <div className="relative max-w-md mx-auto pt-4">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sticker questions..."
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white min-h-11"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = expandedFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      id={`faq-item-btn-${index}`}
                      onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-neutral-50/50 hover:bg-neutral-50 transition-colors min-h-12"
                    >
                      <span className="font-bold text-xs sm:text-sm text-neutral-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-500 transform transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-rose-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-2 bg-white text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 bg-neutral-50 rounded-2xl border border-neutral-200 p-6 space-y-2">
                <p className="text-sm font-semibold text-neutral-700">No questions found matching "{faqSearchQuery}"</p>
                <p className="text-xs text-neutral-500">Try searching for keywords like "WhatsApp", "DPI", "Cut", or "Free".</p>
                <button
                  onClick={() => setFaqSearchQuery('')}
                  className="mt-2 text-xs text-rose-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="w-full py-16 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-300">
            <Sparkles className="w-4 h-4" />
            <span>Ready to Make Your First Sticker?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Create Custom Die-Cut Stickers in Seconds
          </h2>

          <p className="text-neutral-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Free forever for standard transparent PNG downloads. No credit cards, no watermark surprises, and no software download.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="bottom-banner-cta-btn"
              onClick={() => onNavigate({ type: 'editor' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md transition-all min-h-12"
            >
              <Scissors className="w-5 h-5" />
              <span>Launch Sticker Maker Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

