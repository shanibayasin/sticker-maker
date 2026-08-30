import React, { useState, useMemo } from 'react';
import { PageRoute, StickerCategory, StickerTemplate } from '../../types/sticker';
import { STICKER_TEMPLATES } from '../../data/templatesData';
import { DieCutStickerCard } from '../common/DieCutStickerCard';
import { StickerPreviewModal } from '../common/StickerPreviewModal';
import { 
  Sparkles, 
  Scissors, 
  ArrowRight, 
  Search, 
  SlidersHorizontal, 
  TrendingUp, 
  Flame, 
  Clock, 
  RotateCcw,
  Layers,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface TemplatesPageProps {
  onNavigate: (route: PageRoute) => void;
  initialCategory?: StickerCategory | 'all';
}

const PAGE_SIZE = 24;

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ 
  onNavigate, 
  initialCategory = 'all' 
}) => {
  const [activeCategory, setActiveCategory] = useState<StickerCategory | 'all'>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'trending' | 'newest'>('popular');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [previewTemplate, setPreviewTemplate] = useState<StickerTemplate | null>(null);

  const categories: { id: StickerCategory; label: string }[] = [
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'urdu', label: 'Urdu Nastaliq' },
    { id: 'funny', label: 'Funny' },
    { id: 'aesthetic', label: 'Aesthetic' },
    { id: 'logo', label: 'Logo' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'quotes', label: 'Quotes' },
  ];

  // Reset pagination when category, search query, or sorting changes
  const handleCategoryChange = (category: StickerCategory | 'all') => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (sort: 'popular' | 'trending' | 'newest') => {
    setSortBy(sort);
    setVisibleCount(PAGE_SIZE);
  };

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = STICKER_TEMPLATES;

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((t) => t.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((t) => 
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
      );
    }

    // Sort templates
    return [...result].sort((a, b) => {
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
  }, [activeCategory, searchQuery, sortBy]);

  // Current batch of templates to render
  const displayedTemplates = useMemo(() => {
    return filteredTemplates.slice(0, visibleCount);
  }, [filteredTemplates, visibleCount]);

  const hasMore = visibleCount < filteredTemplates.length;
  const remainingCount = Math.max(0, filteredTemplates.length - visibleCount);

  // Load more handler with smooth loading state
  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    
    // Simulate async data fetching / batch rendering
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 350);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. HERO HEADER */}
      <section className="w-full bg-gradient-to-b from-rose-50/60 via-white to-white py-10 sm:py-14 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-6 flex-wrap">
            <button onClick={() => onNavigate({ type: 'home' })} className="hover:text-neutral-700 transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-neutral-500">Sticker Maker</span>
            <span>/</span>
            <span className="text-rose-600 font-bold">Template Library</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/90 border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Vector Library • 100% Free & Customizable</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                Ready-to-Use Sticker Templates
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Browse our complete collection of die-cut stickers. Every template includes vinyl white borders, customizable vector shapes, and instant high-resolution PNG export.
              </p>
            </div>

            <button
              id="templates-header-open-studio-btn"
              onClick={() => onNavigate({ type: 'editor' })}
              className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:shadow transition-all min-h-[44px] shrink-0 self-start md:self-auto"
            >
              <Scissors className="w-4 h-4" />
              <span>Open Blank Canvas Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. TEMPLATES BROWSER & PAGINATION */}
      <section className="w-full py-10 sm:py-16 bg-neutral-50/40 border-b border-neutral-200 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar: Search, Categories & Sort */}
          <div className="space-y-4 mb-8">
            {/* Top row: Search and Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search templates (e.g. coffee, cat, floral, chai)..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-2xs min-h-[42px]"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-neutral-200 shadow-2xs self-start sm:self-auto">
                <span className="text-[11px] font-semibold text-neutral-400 pl-2 pr-1 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Sort:</span>
                </span>
                <button
                  onClick={() => handleSortChange('popular')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 min-h-[34px] ${
                    sortBy === 'popular'
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>Popular</span>
                </button>
                <button
                  onClick={() => handleSortChange('trending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 min-h-[34px] ${
                    sortBy === 'trending'
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>Trending</span>
                </button>
                <button
                  onClick={() => handleSortChange('newest')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 min-h-[34px] ${
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

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-[40px] shrink-0 flex items-center gap-1.5 ${
                  activeCategory === 'all'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                <span>All Templates</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === 'all' ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {STICKER_TEMPLATES.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = STICKER_TEMPLATES.filter((t) => t.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-[40px] shrink-0 flex items-center gap-1.5 ${
                      activeCategory === cat.id
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeCategory === cat.id ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 px-1">
            <span>
              Showing <strong className="text-neutral-900">{displayedTemplates.length}</strong> of <strong className="text-neutral-900">{filteredTemplates.length}</strong> templates
              {activeCategory !== 'all' && (
                <span className="capitalize"> in <strong>{activeCategory}</strong></span>
              )}
            </span>
          </div>

          {/* Templates Grid */}
          {displayedTemplates.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {displayedTemplates.map((template) => (
                  <DieCutStickerCard
                    key={template.id}
                    template={template}
                    onNavigate={onNavigate}
                    onQuickPreview={(t) => setPreviewTemplate(t)}
                  />
                ))}

                {/* Skeleton Cards during Load More transition */}
                {isLoadingMore && (
                  <>
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={`skeleton-${n}`}
                        className="bg-white rounded-2xl p-4 border border-neutral-200/80 animate-pulse space-y-3"
                      >
                        <div className="w-full aspect-square bg-neutral-100 rounded-xl flex items-center justify-center">
                          <Loader2 className="w-6 h-6 text-neutral-300 animate-spin" />
                        </div>
                        <div className="h-4 bg-neutral-200 rounded w-3/4" />
                        <div className="h-3 bg-neutral-100 rounded w-1/2" />
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Load More Pagination Button / End Indicator */}
              <div className="mt-12 sm:mt-16 text-center space-y-4">
                {hasMore ? (
                  <div className="space-y-2">
                    <button
                      id="templates-load-more-btn"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="inline-flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-sm hover:shadow transition-all min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                          <span>Loading Next Batch...</span>
                        </>
                      ) : (
                        <>
                          <Layers className="w-4 h-4 text-rose-400" />
                          <span>Load More Templates</span>
                          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">
                            +{Math.min(PAGE_SIZE, remainingCount)} More
                          </span>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-neutral-400">
                      Showing {displayedTemplates.length} of {filteredTemplates.length} designs
                    </p>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-500 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>You've seen all {filteredTemplates.length} templates in this collection</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 space-y-4 max-w-md mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-100">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-neutral-900">No templates found</h3>
                <p className="text-xs text-neutral-500">
                  {searchQuery 
                    ? `No templates match "${searchQuery}". Try a different keyword or clear your search.`
                    : 'Try switching category filters or create your custom sticker from scratch.'
                  }
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors min-h-[42px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
                <button
                  onClick={() => onNavigate({ type: 'editor' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-200 transition-colors min-h-[42px]"
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
    </div>
  );
};
