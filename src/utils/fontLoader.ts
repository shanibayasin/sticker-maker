import { FONT_LIBRARY, FontItem } from '../data/fontsData';

// Cache for loaded Google Fonts family names
const loadedFontsCache = new Set<string>();
const loadingPromises = new Map<string, Promise<boolean>>();

// Listeners for font load events (to trigger canvas re-render)
type FontLoadCallback = (fontName: string) => void;
const fontLoadListeners = new Set<FontLoadCallback>();

export const subscribeFontLoad = (cb: FontLoadCallback): (() => void) => {
  fontLoadListeners.add(cb);
  return () => {
    fontLoadListeners.delete(cb);
  };
};

const notifyFontLoaded = (fontName: string) => {
  fontLoadListeners.forEach((cb) => {
    try {
      cb(fontName);
    } catch {
      // Ignore listener error
    }
  });
};

/**
 * Lazy loads a Google Font dynamically by injecting a link tag with display=swap
 */
export async function loadGoogleFont(fontName: string): Promise<boolean> {
  if (!fontName) return true;

  // Clean font family name if enclosed in quotes
  const cleanName = fontName.replace(/['"]/g, '').trim();

  // If already loaded in memory cache
  if (loadedFontsCache.has(cleanName)) {
    return true;
  }

  // If currently loading, return ongoing promise
  if (loadingPromises.has(cleanName)) {
    return loadingPromises.get(cleanName)!;
  }

  const fontItem = FONT_LIBRARY.find(
    (f) => f.name.toLowerCase() === cleanName.toLowerCase() || f.id.toLowerCase() === cleanName.toLowerCase()
  );

  const googleSpec = fontItem ? fontItem.googleFontFamily : `${encodeURIComponent(cleanName)}:wght@400;700`;
  const linkId = `google-font-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const loadPromise = new Promise<boolean>((resolve) => {
    // Check if stylesheet tag already exists in DOM
    if (document.getElementById(linkId)) {
      loadedFontsCache.add(cleanName);
      notifyFontLoaded(cleanName);
      resolve(true);
      return;
    }

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${googleSpec}&display=swap`;

    link.onload = () => {
      loadedFontsCache.add(cleanName);
      // Wait for document.fonts to actually register the font
      if ('fonts' in document) {
        document.fonts.load(`16px "${cleanName}"`).then(() => {
          notifyFontLoaded(cleanName);
          resolve(true);
        }).catch(() => {
          notifyFontLoaded(cleanName);
          resolve(true);
        });
      } else {
        notifyFontLoaded(cleanName);
        resolve(true);
      }
    };

    link.onerror = () => {
      console.warn(`[FontLoader] Failed to load Google Font: ${cleanName}`);
      resolve(false);
    };

    document.head.appendChild(link);
  });

  loadingPromises.set(cleanName, loadPromise);
  return loadPromise;
}

/**
 * Batch lazy-loads an array of fonts (e.g. for preview list)
 */
export function batchLoadFonts(fontNames: string[]): void {
  fontNames.forEach((name) => {
    loadGoogleFont(name);
  });
}

/**
 * Storage helpers for Recent Fonts
 */
const RECENT_FONTS_KEY = 'stickermaker_recent_fonts_v1';
const DEFAULT_RECENT = ['Fredoka', 'Noto Nastaliq Urdu', 'Bangers', 'Outfit'];

export function getRecentFonts(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_FONTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 4);
      }
    }
  } catch {
    // Ignore error
  }
  return DEFAULT_RECENT;
}

export function addRecentFont(fontName: string): string[] {
  if (!fontName) return getRecentFonts();
  try {
    const current = getRecentFonts();
    const updated = [fontName, ...current.filter((f) => f.toLowerCase() !== fontName.toLowerCase())].slice(0, 4);
    localStorage.setItem(RECENT_FONTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_RECENT;
  }
}
