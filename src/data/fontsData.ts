export interface FontItem {
  id: string;
  name: string;
  category: FontCategory;
  googleFontFamily: string;
  previewText?: string;
  isRtl?: boolean;
  samplePhrase?: string;
}

export type FontCategory =
  | 'Urdu'
  | 'English – Display/Fun'
  | 'English – Handwriting/Script'
  | 'English – Sans Serif'
  | 'English – Serif'
  | 'English – Bold/Headline';

export const FONT_CATEGORIES: FontCategory[] = [
  'Urdu',
  'English – Display/Fun',
  'English – Handwriting/Script',
  'English – Sans Serif',
  'English – Serif',
  'English – Bold/Headline',
];

export const FONT_LIBRARY: FontItem[] = [
  // 1. URDU FONTS
  {
    id: 'noto-nastaliq-urdu',
    name: 'Noto Nastaliq Urdu',
    category: 'Urdu',
    googleFontFamily: 'Noto+Nastaliq+Urdu:wght@400;700',
    isRtl: true,
    samplePhrase: 'خط نستعلیق اردو',
  },
  {
    id: 'noto-naskh-arabic',
    name: 'Noto Naskh Arabic',
    category: 'Urdu',
    googleFontFamily: 'Noto+Naskh+Arabic:wght@400;700',
    isRtl: true,
    samplePhrase: 'خط نسخ خوبصورت',
  },
  {
    id: 'gulzar',
    name: 'Gulzar',
    category: 'Urdu',
    googleFontFamily: 'Gulzar',
    isRtl: true,
    samplePhrase: 'گلزار نستعلیق',
  },
  {
    id: 'lateef',
    name: 'Lateef',
    category: 'Urdu',
    googleFontFamily: 'Lateef:wght@400;700',
    isRtl: true,
    samplePhrase: 'لطیف اردو فونٹ',
  },
  {
    id: 'harmattan',
    name: 'Harmattan',
    category: 'Urdu',
    googleFontFamily: 'Harmattan:wght@400;700',
    isRtl: true,
    samplePhrase: 'ہرمتان نستعلیق',
  },
  {
    id: 'mirza',
    name: 'Mirza',
    category: 'Urdu',
    googleFontFamily: 'Mirza:wght@400;700',
    isRtl: true,
    samplePhrase: 'مرزا خوبصورت انداز',
  },
  {
    id: 'aref-ruqaa',
    name: 'Aref Ruqaa',
    category: 'Urdu',
    googleFontFamily: 'Aref+Ruqaa:wght@400;700',
    isRtl: true,
    samplePhrase: 'عارف رقعہ خط',
  },
  {
    id: 'scheherazade-new',
    name: 'Scheherazade New',
    category: 'Urdu',
    googleFontFamily: 'Scheherazade+New:wght@400;700',
    isRtl: true,
    samplePhrase: 'شہرزاد روایتی خط',
  },

  // 2. ENGLISH – DISPLAY / FUN
  {
    id: 'bangers',
    name: 'Bangers',
    category: 'English – Display/Fun',
    googleFontFamily: 'Bangers',
    samplePhrase: 'STICKER POP!',
  },
  {
    id: 'fredoka',
    name: 'Fredoka',
    category: 'English – Display/Fun',
    googleFontFamily: 'Fredoka:wght@400;600;700',
    samplePhrase: 'Cute & Playful',
  },
  {
    id: 'bungee',
    name: 'Bungee',
    category: 'English – Display/Fun',
    googleFontFamily: 'Bungee',
    samplePhrase: 'BLOCK BADGE',
  },
  {
    id: 'luckiest-guy',
    name: 'Luckiest Guy',
    category: 'English – Display/Fun',
    googleFontFamily: 'Luckiest+Guy',
    samplePhrase: 'FUNNY MEME',
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    category: 'English – Display/Fun',
    googleFontFamily: 'Bebas+Neue',
    samplePhrase: 'BOLD CONDENSED',
  },
  {
    id: 'righteous',
    name: 'Righteous',
    category: 'English – Display/Fun',
    googleFontFamily: 'Righteous',
    samplePhrase: 'Retro Wave 80s',
  },
  {
    id: 'bowlby-one',
    name: 'Bowlby One',
    category: 'English – Display/Fun',
    googleFontFamily: 'Bowlby+One',
    samplePhrase: 'HEAVY POP',
  },
  {
    id: 'titan-one',
    name: 'Titan One',
    category: 'English – Display/Fun',
    googleFontFamily: 'Titan+One',
    samplePhrase: 'CHUBBY TITAN',
  },
  {
    id: 'baloo-2',
    name: 'Baloo 2',
    category: 'English – Display/Fun',
    googleFontFamily: 'Baloo+2:wght@400;600;800',
    samplePhrase: 'Bubbly Friendly',
  },
  {
    id: 'chewy',
    name: 'Chewy',
    category: 'English – Display/Fun',
    googleFontFamily: 'Chewy',
    samplePhrase: 'Sweet Candy',
  },

  // 3. ENGLISH – HANDWRITING / SCRIPT
  {
    id: 'pacifico',
    name: 'Pacifico',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Pacifico',
    samplePhrase: 'Vintage Beach',
  },
  {
    id: 'caveat',
    name: 'Caveat',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Caveat:wght@400;700',
    samplePhrase: 'Casual Marker Note',
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Dancing+Script:wght@400;700',
    samplePhrase: 'Graceful Flow',
  },
  {
    id: 'shadows-into-light',
    name: 'Shadows Into Light',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Shadows+Into+Light',
    samplePhrase: 'Handmade Doodle',
  },
  {
    id: 'great-vibes',
    name: 'Great Vibes',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Great+Vibes',
    samplePhrase: 'Elegant Calligraphy',
  },
  {
    id: 'satisfy',
    name: 'Satisfy',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Satisfy',
    samplePhrase: 'Smooth Signature',
  },
  {
    id: 'kalam',
    name: 'Kalam',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Kalam:wght@400;700',
    samplePhrase: 'Handwritten Journal',
  },
  {
    id: 'permanent-marker',
    name: 'Permanent Marker',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Permanent+Marker',
    samplePhrase: 'SHARPIE DOODLE',
  },
  {
    id: 'amatic-sc',
    name: 'Amatic SC',
    category: 'English – Handwriting/Script',
    googleFontFamily: 'Amatic+SC:wght@400;700',
    samplePhrase: 'TALL SKINNY SCRIPT',
  },

  // 4. ENGLISH – SANS SERIF
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'English – Sans Serif',
    googleFontFamily: 'Poppins:wght@400;600;700',
    samplePhrase: 'Clean Geometric',
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'English – Sans Serif',
    googleFontFamily: 'Inter:wght@400;600;700',
    samplePhrase: 'Modern Crisp UI',
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'English – Sans Serif',
    googleFontFamily: 'Montserrat:wght@400;600;800',
    samplePhrase: 'Urban Modernist',
  },
  {
    id: 'raleway',
    name: 'Raleway',
    category: 'English – Sans Serif',
    googleFontFamily: 'Raleway:wght@400;600;700',
    samplePhrase: 'Refined & Sleek',
  },
  {
    id: 'nunito',
    name: 'Nunito',
    category: 'English – Sans Serif',
    googleFontFamily: 'Nunito:wght@400;600;800',
    samplePhrase: 'Soft Rounded Sans',
  },
  {
    id: 'work-sans',
    name: 'Work Sans',
    category: 'English – Sans Serif',
    googleFontFamily: 'Work+Sans:wght@400;600;700',
    samplePhrase: 'Balanced & Direct',
  },
  {
    id: 'rubik',
    name: 'Rubik',
    category: 'English – Sans Serif',
    googleFontFamily: 'Rubik:wght@400;600;800',
    samplePhrase: 'Sturdy Rounded',
  },
  {
    id: 'quicksand',
    name: 'Quicksand',
    category: 'English – Sans Serif',
    googleFontFamily: 'Quicksand:wght@400;600;700',
    samplePhrase: 'Friendly Geometry',
  },
  {
    id: 'dm-sans',
    name: 'DM Sans',
    category: 'English – Sans Serif',
    googleFontFamily: 'DM+Sans:wght@400;700',
    samplePhrase: 'Minimal Editorial',
  },
  {
    id: 'outfit',
    name: 'Outfit',
    category: 'English – Sans Serif',
    googleFontFamily: 'Outfit:wght@400;600;800',
    samplePhrase: 'Premium Brand Sans',
  },

  // 5. ENGLISH – SERIF
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    category: 'English – Serif',
    googleFontFamily: 'Playfair+Display:wght@400;700',
    samplePhrase: 'Luxury Editorial',
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    category: 'English – Serif',
    googleFontFamily: 'Merriweather:wght@400;700',
    samplePhrase: 'Classic Book Serif',
  },
  {
    id: 'lora',
    name: 'Lora',
    category: 'English – Serif',
    googleFontFamily: 'Lora:wght@400;700',
    samplePhrase: 'Contemporary Curves',
  },
  {
    id: 'cormorant-garamond',
    name: 'Cormorant Garamond',
    category: 'English – Serif',
    googleFontFamily: 'Cormorant+Garamond:wght@400;700',
    samplePhrase: 'Fine Art Heritage',
  },
  {
    id: 'libre-baskerville',
    name: 'Libre Baskerville',
    category: 'English – Serif',
    googleFontFamily: 'Libre+Baskerville:wght@400;700',
    samplePhrase: 'Timeless Academic',
  },
  {
    id: 'abril-fatface',
    name: 'Abril Fatface',
    category: 'English – Serif',
    googleFontFamily: 'Abril+Fatface',
    samplePhrase: 'DRAMATIC POSTER',
  },

  // 6. ENGLISH – BOLD / HEADLINE
  {
    id: 'anton',
    name: 'Anton',
    category: 'English – Bold/Headline',
    googleFontFamily: 'Anton',
    samplePhrase: 'MASSIVE HEADLINE',
  },
  {
    id: 'archivo-black',
    name: 'Archivo Black',
    category: 'English – Bold/Headline',
    googleFontFamily: 'Archivo+Black',
    samplePhrase: 'SOLID IMPACT',
  },
  {
    id: 'passion-one',
    name: 'Passion One',
    category: 'English – Bold/Headline',
    googleFontFamily: 'Passion+One:wght@400;700;900',
    samplePhrase: 'PUNCHY STICKER',
  },
  {
    id: 'alfa-slab-one',
    name: 'Alfa Slab One',
    category: 'English – Bold/Headline',
    googleFontFamily: 'Alfa+Slab+One',
    samplePhrase: 'WESTERN SLAB',
  },
  {
    id: 'black-ops-one',
    name: 'Black Ops One',
    category: 'English – Bold/Headline',
    googleFontFamily: 'Black+Ops+One',
    samplePhrase: 'STENCIL TACTICAL',
  },
];

export const URDU_FONT_NAMES = FONT_LIBRARY.filter((f) => f.category === 'Urdu').map((f) => f.name);

export const isUrduFontFamily = (fontFamily?: string): boolean => {
  if (!fontFamily) return false;
  return URDU_FONT_NAMES.includes(fontFamily);
};

export const hasRtlCharacters = (text?: string): boolean => {
  if (!text) return false;
  // Unicode ranges for Arabic, Urdu, Persian, Pashto, Hebrew
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;
  return rtlRegex.test(text);
};
