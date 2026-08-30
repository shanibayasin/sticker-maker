import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Clock, 
  X,
  Type
} from 'lucide-react';
import { 
  FONT_LIBRARY, 
  FONT_CATEGORIES, 
  FontCategory, 
  FontItem, 
  isUrduFontFamily 
} from '../../data/fontsData';
import { 
  loadGoogleFont, 
  getRecentFonts, 
  addRecentFont 
} from '../../utils/fontLoader';

interface FontPickerProps {
  value: string;
  onChange: (fontName: string, isRtl?: boolean) => void;
  className?: string;
  triggerClassName?: string;
  popoverPlacement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export const FontPicker: React.FC<FontPickerProps> = ({
  value,
  onChange,
  className = '',
  triggerClassName = '',
  popoverPlacement = 'bottom-start',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentFonts, setRecentFonts] = useState<string[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize recent fonts & ensure selected font is loaded
  useEffect(() => {
    setRecentFonts(getRecentFonts());
    if (value) {
      loadGoogleFont(value);
    }
  }, [value]);

  // Load fonts visible in viewport when popover opens
  useEffect(() => {
    if (isOpen) {
      // Pre-load recent fonts and popular fonts
      recentFonts.forEach((f) => loadGoogleFont(f));
      // Focus search input
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, recentFonts]);

  // Outside click listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSelectFont = (fontItem: FontItem | { name: string; isRtl?: boolean }) => {
    const isRtl = fontItem.isRtl || isUrduFontFamily(fontItem.name);
    loadGoogleFont(fontItem.name);
    const updatedRecents = addRecentFont(fontItem.name);
    setRecentFonts(updatedRecents);
    onChange(fontItem.name, isRtl);
    setIsOpen(false);
  };

  // Filtered fonts logic
  const filteredFonts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FONT_LIBRARY;

    return FONT_LIBRARY.filter((font) => {
      const matchName = font.name.toLowerCase().includes(q);
      const matchCategory = font.category.toLowerCase().includes(q);
      const matchSample = font.samplePhrase ? font.samplePhrase.toLowerCase().includes(q) : false;
      const matchKeywords = 
        (q === 'urdu' && font.category === 'Urdu') ||
        (q === 'nastaliq' && (font.name.toLowerCase().includes('nastaliq') || font.name === 'Gulzar')) ||
        (q === 'script' && font.category.includes('Script')) ||
        (q === 'meme' && font.category.includes('Display')) ||
        (q === 'comic' && (font.name === 'Fredoka' || font.name === 'Bangers')) ||
        (q === 'bold' && font.category.includes('Bold'));

      return matchName || matchCategory || matchSample || matchKeywords;
    });
  }, [searchQuery]);

  // Group fonts by category
  const groupedFonts = useMemo(() => {
    const groups: Record<FontCategory, FontItem[]> = {
      'Urdu': [],
      'English – Display/Fun': [],
      'English – Handwriting/Script': [],
      'English – Sans Serif': [],
      'English – Serif': [],
      'English – Bold/Headline': [],
    };

    filteredFonts.forEach((font) => {
      if (groups[font.category]) {
        groups[font.category].push(font);
      }
    });

    return groups;
  }, [filteredFonts]);

  // Recent Font Items mapped to FontItem
  const recentFontItems = useMemo(() => {
    if (searchQuery) return [];
    return recentFonts
      .map((fontName) => FONT_LIBRARY.find((f) => f.name.toLowerCase() === fontName.toLowerCase()))
      .filter((item): item is FontItem => !!item);
  }, [recentFonts, searchQuery]);

  // Find active font details
  const activeFontItem = useMemo(() => {
    return FONT_LIBRARY.find((f) => f.name.toLowerCase() === (value || '').toLowerCase()) || {
      name: value || 'Fredoka',
      category: 'English – Display/Fun' as FontCategory,
      isRtl: isUrduFontFamily(value),
    };
  }, [value]);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-2.5 py-1.5 bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/30 ${triggerClassName}`}
        title="Select Font Family"
      >
        <div className="flex items-center gap-1.5 truncate max-w-[140px] sm:max-w-[160px]">
          <Type className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span 
            className="truncate font-semibold text-neutral-900"
            style={{ fontFamily: activeFontItem.name }}
          >
            {activeFontItem.name}
          </span>
          {activeFontItem.isRtl && (
            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded shrink-0">
              اردو
            </span>
          )}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-rose-500' : ''}`} />
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 text-neutral-800 text-xs overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col max-h-[380px] ${
            popoverPlacement.includes('bottom-end') || popoverPlacement.includes('top-end') ? 'right-0' : 'left-0'
          }`}
          style={{
            top: popoverPlacement.startsWith('top') ? 'auto' : '100%',
            bottom: popoverPlacement.startsWith('top') ? '100%' : 'auto',
          }}
        >
          {/* Header & Search Bar */}
          <div className="p-2.5 border-b border-neutral-150 bg-neutral-50/80 backdrop-blur-xs space-y-2 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-500" />
                <span>Font Library ({FONT_LIBRARY.length})</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">Google Fonts</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Urdu, Script, Bangers..."
                className="w-full pl-8 pr-7 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Font List */}
          <div ref={listContainerRef} className="flex-1 overflow-y-auto p-1.5 space-y-2 divide-y divide-neutral-100">
            {/* 1. RECENT FONTS (if not searching) */}
            {recentFontItems.length > 0 && !searchQuery && (
              <div className="pb-1.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>Recently Used</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {recentFontItems.map((font) => (
                    <FontOptionRow
                      key={`recent-${font.id}`}
                      font={font}
                      isSelected={value.toLowerCase() === font.name.toLowerCase()}
                      onSelect={() => handleSelectFont(font)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. CATEGORY GROUPS */}
            {FONT_CATEGORIES.map((category) => {
              const fontsInCategory = groupedFonts[category] || [];
              if (fontsInCategory.length === 0) return null;

              const isCollapsed = !searchQuery && collapsedCategories[category];

              return (
                <div key={category} className="pt-1.5 first:pt-0">
                  {/* Category Header */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      {isCollapsed ? (
                        <ChevronRight className="w-3 h-3 text-neutral-400" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-neutral-400" />
                      )}
                      <span>{category}</span>
                      {category === 'Urdu' && (
                        <span className="text-[9px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded-full ml-1">
                          نستعلیق
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      {fontsInCategory.length}
                    </span>
                  </button>

                  {/* Fonts in category */}
                  {!isCollapsed && (
                    <div className="space-y-0.5 mt-1 pl-1">
                      {fontsInCategory.map((font) => (
                        <FontOptionRow
                          key={font.id}
                          font={font}
                          isSelected={value.toLowerCase() === font.name.toLowerCase()}
                          onSelect={() => handleSelectFont(font)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Empty Search Result */}
            {filteredFonts.length === 0 && (
              <div className="py-8 text-center space-y-1.5">
                <p className="text-xs font-semibold text-neutral-600">No fonts found for "{searchQuery}"</p>
                <p className="text-[11px] text-neutral-400">Try searching for "Urdu", "Script", "Bold", or "Sans"</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs font-bold text-rose-600 hover:text-rose-700"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for individual font rows with hover lazy loading
interface FontOptionRowProps {
  font: FontItem;
  isSelected: boolean;
  onSelect: () => void;
}

const FontOptionRow: React.FC<FontOptionRowProps> = ({ font, isSelected, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy load font on mouse enter or if selected
  const handleMouseEnter = () => {
    if (!isLoaded) {
      loadGoogleFont(font.name).then(() => setIsLoaded(true));
    }
  };

  useEffect(() => {
    if (isSelected && !isLoaded) {
      loadGoogleFont(font.name).then(() => setIsLoaded(true));
    }
  }, [isSelected, isLoaded, font.name]);

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all min-h-[36px] text-left group ${
        isSelected
          ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200/80 shadow-2xs'
          : 'hover:bg-neutral-100 text-neutral-800'
      }`}
    >
      <div className="flex flex-col min-w-0 pr-2">
        <div className="flex items-center gap-1.5">
          <span
            className="text-sm truncate text-neutral-900"
            style={{ fontFamily: `"${font.name}", sans-serif` }}
          >
            {font.name}
          </span>
          {font.isRtl && (
            <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1 rounded border border-emerald-200 shrink-0">
              RTL
            </span>
          )}
        </div>
        {font.samplePhrase && (
          <span
            className={`text-[11px] text-neutral-500 truncate mt-0.5 ${
              font.isRtl ? 'font-urdu text-right' : ''
            }`}
            dir={font.isRtl ? 'rtl' : 'ltr'}
            style={{ fontFamily: `"${font.name}", sans-serif` }}
          >
            {font.samplePhrase}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isSelected ? (
          <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xs">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
        ) : (
          <span className="text-[10px] text-neutral-300 group-hover:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Select
          </span>
        )}
      </div>
    </button>
  );
};
