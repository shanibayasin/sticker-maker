export type StickerCategory = 
  | 'funny' 
  | 'aesthetic' 
  | 'logo' 
  | 'whatsapp' 
  | 'instagram' 
  | 'quotes' 
  | 'urdu';

export interface CategoryInfo {
  slug: StickerCategory;
  name: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keywords: string[];
  specs: {
    recommendedSize: string;
    format: string;
    dpi: string;
    useCase: string;
  };
  samplePrompts: string[];
  relatedCategories: StickerCategory[];
  faqs: { question: string; answer: string }[];
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'badge';
  content?: string;
  imgSrc?: string;
  imgElement?: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  textAlign?: 'left' | 'center' | 'right';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  angle?: number;
  opacity?: number;
  scaleX?: number;
  scaleY?: number;
  shapeType?: string;
  curved?: boolean;
  filterBrightness?: number; // 0-200, default 100
  filterContrast?: number; // 0-200, default 100
  filterSaturation?: number; // 0-200, default 100
  filterBlur?: number; // 0-20, default 0
  filterSepia?: number; // 0-100, default 0
  filterInvert?: number; // 0-100, default 0
  flipH?: boolean;
  flipV?: boolean;
}

export interface StickerTemplate {
  id: string;
  title: string;
  category: StickerCategory;
  thumbnail: string;
  elements: Array<{
    type: 'text' | 'image' | 'shape' | 'badge';
    content?: string;
    src?: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    fontSize?: number;
    fontFamily?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    scaleX?: number;
    scaleY?: number;
    angle?: number;
    shapeType?: string;
    shadow?: boolean;
  }>;
  borderWidth: number;
  borderColor: string;
  hasShadow: boolean;
  uses?: number;
  isTrending?: boolean;
  createdAt?: string;
  description?: string;
}

export interface ClipartItem {
  id: string;
  name: string;
  category: 'emojis' | 'doodles' | 'badges' | 'urdu' | 'retro' | 'shapes';
  svgString?: string;
  url?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  excerpt: string;
  byline?: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  content: string[];
}

export type PageRoute = 
  | { type: 'home'; landingSlug?: 'sticker-maker' | 'free-sticker-maker' | 'custom-sticker-maker' }
  | { type: 'editor'; category?: StickerCategory; templateId?: string }
  | { type: 'category'; category: StickerCategory }
  | { type: 'templates'; category?: StickerCategory | 'all' }
  | { type: 'blog' }
  | { type: 'blog-post'; slug: string }
  | { type: 'pricing' }
  | { type: 'about' }
  | { type: 'privacy-policy' }
  | { type: 'terms' }
  | { type: 'landing'; slug: 'sticker-maker' | 'free-sticker-maker' | 'whatsapp-sticker-maker' | 'photo-to-sticker' | 'custom-sticker-maker' };
