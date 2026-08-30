import React, { useEffect } from 'react';
import { PageRoute } from '../../types/sticker';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { BLOG_POSTS } from '../../data/blogData';

interface SEOHeadProps {
  currentRoute: PageRoute;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentRoute }) => {
  useEffect(() => {
    let title = 'Sticker Maker — Design Custom Stickers Free in Seconds';
    let description = 'Create custom die-cut stickers online in seconds. AI background removal, auto white border, 1000+ templates, and instant transparent PNG or 300 DPI print-ready export. No signup required.';

    if (currentRoute.type === 'editor') {
      title = 'Sticker Maker Online Editor — Free Custom Die-Cut Tool';
      description = 'Design custom stickers with live die-cut border generator, AI background removal, curved text, and high-res transparent PNG download.';
    } else if (currentRoute.type === 'templates') {
      title = 'Sticker Templates Library — 1000+ Ready-to-Use Vector Designs';
      description = 'Browse trending die-cut sticker templates across WhatsApp, Urdu calligraphy, memes, aesthetic quotes, and business logos. Customize and export free.';
    } else if (currentRoute.type === 'category') {
      const catData = CATEGORIES_DATA[currentRoute.category];
      if (catData) {
        title = catData.metaTitle;
        description = catData.metaDescription;
      }
    } else if (currentRoute.type === 'blog') {
      title = 'Sticker Design Guides & 300 DPI Printing Specs — StickerMaker';
      description = 'Free guides on making WhatsApp stickers, sizing stickers for vinyl printing, auto die-cut borders, and Instagram story sticker overlays.';
    } else if (currentRoute.type === 'blog-post') {
      const post = BLOG_POSTS.find((p) => p.slug === currentRoute.slug);
      if (post) {
        title = `${post.title} — StickerMaker Guide`;
        description = post.excerpt;
      }
    } else if (currentRoute.type === 'pricing') {
      title = 'Pricing — Free vs Pro Sticker Maker Tool';
      description = '100% free for standard transparent PNG downloads. Optional Pro tier for batch pack export and custom brand fonts.';
    } else if (currentRoute.type === 'about') {
      title = 'About StickerMaker — Faster, Simpler Canva Alternative';
      description = 'Discover why StickerMaker was built to provide instant 0.4s sticker design without mandatory logins or watermarks.';
    }

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update og:title and og:description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentRoute]);

  return null;
};
