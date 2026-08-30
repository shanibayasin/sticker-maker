import React from 'react';
import { PageRoute, StickerCategory } from '../../types/sticker';
import { Scissors, Heart, Sparkles, ShieldCheck, Zap, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const categoryLinks: { slug: StickerCategory; label: string }[] = [
    { slug: 'funny', label: 'Funny & Meme Stickers' },
    { slug: 'aesthetic', label: 'Aesthetic & Indie Stickers' },
    { slug: 'logo', label: 'Logo & Merch Stickers' },
    { slug: 'whatsapp', label: 'WhatsApp Sticker Maker (512x512)' },
    { slug: 'instagram', label: 'Instagram Stories Stickers' },
    { slug: 'quotes', label: 'Quote & Lettering Stickers' },
    { slug: 'urdu', label: 'Urdu & Nastaliq Calligraphy' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      {/* Top Banner / Value Proposition */}
      <div className="border-b border-neutral-800 bg-neutral-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Blazing Fast 0.4s Render</p>
                <p className="text-xs text-neutral-400">Direct client-side canvas without heavy lag</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">No Signup Required</p>
                <p className="text-xs text-neutral-400">Instant transparent PNG & 300 DPI downloads</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Auto Die-Cut Contours</p>
                <p className="text-xs text-neutral-400">Signature vinyl white borders with one click</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div 
              id="footer-brand-logo"
              onClick={() => onNavigate({ type: 'home' })}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-sm">
                <div className="w-full h-full bg-neutral-900 rounded-[10px] flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-rose-400 transform -rotate-45" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Sticker<span className="text-rose-400">Maker</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pr-6">
              The fastest, lightest online sticker design studio. Engineered to replace bloated graphics software with instant background removal, customizable die-cut white borders, and 300 DPI print-ready vectors.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
              <Globe className="w-4 h-4 text-neutral-500" />
              <span>Ranked #1 Free Alternative to Canva Sticker Maker</span>
            </div>
          </div>

          {/* Sticker Categories (Internal SEO Linking) */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Sticker Collections</p>
            <ul className="space-y-2.5 text-xs">
              {categoryLinks.map((cat) => (
                <li key={cat.slug}>
                  <button
                    id={`footer-link-cat-${cat.slug}`}
                    onClick={() => onNavigate({ type: 'category', category: cat.slug })}
                    className="hover:text-rose-400 transition-colors text-left"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Tools */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Guides & Sizing</p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  id="footer-guide-whatsapp"
                  onClick={() => onNavigate({ type: 'blog-post', slug: 'how-to-make-whatsapp-stickers' })}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Make WhatsApp Stickers (3 Steps)
                </button>
              </li>
              <li>
                <button
                  id="footer-guide-sizing"
                  onClick={() => onNavigate({ type: 'blog-post', slug: 'best-sticker-size-for-printing' })}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Sticker Sizing & 300 DPI Guide
                </button>
              </li>
              <li>
                <button
                  id="footer-guide-diecut"
                  onClick={() => onNavigate({ type: 'blog-post', slug: 'how-to-create-die-cut-white-borders' })}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Auto Die-Cut Borders Guide
                </button>
              </li>
              <li>
                <button
                  id="footer-link-all-blog"
                  onClick={() => onNavigate({ type: 'blog' })}
                  className="text-rose-400 hover:underline font-medium"
                >
                  View All Guides →
                </button>
              </li>
            </ul>
          </div>

          {/* Product & Legal */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company & Free Tools</p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  id="footer-link-templates"
                  onClick={() => onNavigate({ type: 'templates' })}
                  className="hover:text-rose-400 transition-colors text-left font-medium text-rose-300"
                >
                  Template Library (30+ Designs)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-editor"
                  onClick={() => onNavigate({ type: 'editor' })}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Online Sticker Studio
                </button>
              </li>
              <li>
                <button
                  id="footer-link-pricing"
                  onClick={() => onNavigate({ type: 'pricing' })}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Free vs Pro Tier
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  About & Speed Benchmarks
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-rose-400 transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-rose-400 transition-colors"
                >
                  Robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} StickerMaker. Built for high-speed custom sticker creation.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
