import React from 'react';
import { PageRoute, StickerCategory } from '../../types/sticker';
import { Sparkles, Scissors, ChevronDown, BookOpen, Tag, Info, ArrowRight, X, Menu } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const categories: { slug: StickerCategory; label: string; badge?: string }[] = [
    { slug: 'whatsapp', label: 'WhatsApp Stickers', badge: 'Popular' },
    { slug: 'urdu', label: 'Urdu & Nastaliq', badge: 'Unique' },
    { slug: 'funny', label: 'Funny & Memes' },
    { slug: 'aesthetic', label: 'Aesthetic & Indie' },
    { slug: 'logo', label: 'Logo & Merch' },
    { slug: 'instagram', label: 'Instagram Stories' },
    { slug: 'quotes', label: 'Quotes & Lettering' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            id="nav-brand-logo"
            onClick={() => onNavigate({ type: 'home' })}
            className="flex items-center gap-2.5 cursor-pointer group select-none min-h-[44px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-rose-500 transform -rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-neutral-900">
                  Sticker<span className="text-rose-500">Maker</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-md border border-rose-200">
                  Free
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium hidden sm:block">Die-Cut Vector Studio</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-neutral-600">
            <button
              id="nav-templates-link"
              onClick={() => onNavigate({ type: 'templates' })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors min-h-[40px] ${
                currentRoute.type === 'templates' ? 'text-rose-600 bg-rose-50 font-semibold' : 'hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Templates</span>
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                id="nav-categories-dropdown-btn"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                onBlur={() => setTimeout(() => setIsCategoryMenuOpen(false), 200)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors min-h-[40px] ${
                  currentRoute.type === 'category' ? 'text-rose-600 bg-rose-50 font-semibold' : 'hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1 mb-1">
                    Sticker Collections
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      id={`nav-cat-link-${cat.slug}`}
                      onClick={() => {
                        setIsCategoryMenuOpen(false);
                        onNavigate({ type: 'category', category: cat.slug });
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      <span className="font-medium text-neutral-800">{cat.label}</span>
                      {cat.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          cat.badge === 'Unique' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              id="nav-blog-link"
              onClick={() => onNavigate({ type: 'blog' })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors min-h-[40px] ${
                currentRoute.type === 'blog' || currentRoute.type === 'blog-post' ? 'text-rose-600 bg-rose-50 font-semibold' : 'hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guides & Sizing</span>
            </button>

            <button
              id="nav-pricing-link"
              onClick={() => onNavigate({ type: 'pricing' })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors min-h-[40px] ${
                currentRoute.type === 'pricing' ? 'text-rose-600 bg-rose-50 font-semibold' : 'hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Pricing</span>
            </button>

            <button
              id="nav-about-link"
              onClick={() => onNavigate({ type: 'about' })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors min-h-[40px] ${
                currentRoute.type === 'about' ? 'text-rose-600 bg-rose-50 font-semibold' : 'hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
          </nav>

          {/* Primary CTA button to Editor */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="nav-start-editor-btn"
              onClick={() => onNavigate({ type: 'editor' })}
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all min-h-[40px]"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden xs:inline">Create a Sticker</span>
              <span className="xs:hidden">Editor</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-800" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-neutral-900/35 backdrop-blur-[1px]" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-[86vw] max-w-sm bg-white shadow-2xl border-l border-neutral-200 animate-in slide-in-from-right-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                    <Scissors className="w-4 h-4 text-rose-500 transform -rotate-45" />
                  </div>
                </div>
                <span className="text-sm font-extrabold text-neutral-900">Menu</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 pt-4 pb-6 space-y-3">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-2 pt-1">Collections</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate({ type: 'category', category: cat.slug });
                    }}
                    className="text-left text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-neutral-50 hover:bg-rose-50 hover:text-rose-600 font-medium text-neutral-800 min-h-[44px] flex items-center justify-between transition-colors border border-neutral-150"
                  >
                    <span>{cat.label}</span>
                    {cat.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                        {cat.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ type: 'templates' });
                  }}
                  className="w-full text-left px-3.5 py-3 text-sm font-medium rounded-xl hover:bg-neutral-50 min-h-[44px] flex items-center gap-2 text-rose-600 bg-rose-50/60 font-semibold"
                >
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Browse All Templates</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ type: 'blog' });
                  }}
                  className="w-full text-left px-3.5 py-3 text-sm font-medium rounded-xl hover:bg-neutral-50 min-h-[44px] flex items-center gap-2 text-neutral-700"
                >
                  <BookOpen className="w-4 h-4 text-neutral-500" />
                  <span>Guides & Sizing</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ type: 'pricing' });
                  }}
                  className="w-full text-left px-3.5 py-3 text-sm font-medium rounded-xl hover:bg-neutral-50 min-h-[44px] flex items-center gap-2 text-neutral-700"
                >
                  <Tag className="w-4 h-4 text-neutral-500" />
                  <span>Pricing (100% Free)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ type: 'about' });
                  }}
                  className="w-full text-left px-3.5 py-3 text-sm font-medium rounded-xl hover:bg-neutral-50 min-h-[44px] flex items-center gap-2 text-neutral-700"
                >
                  <Info className="w-4 h-4 text-neutral-500" />
                  <span>About StickerMaker</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

