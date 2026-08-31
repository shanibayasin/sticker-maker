import React, { useEffect } from 'react';
import { PageRoute } from '../../types/sticker';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { BLOG_POSTS } from '../../data/blogData';

interface SEOHeadProps {
  currentRoute: PageRoute;
}

const SITE_URL = 'https://sticker-maker-online.vercel.app';

const getCanonicalUrl = (route: PageRoute) => {
  if (route.type === 'editor') return `${SITE_URL}/create/stickers`;
  if (route.type === 'templates') return `${SITE_URL}/templates`;
  if (route.type === 'category') return `${SITE_URL}/sticker-maker/${route.category}`;
  if (route.type === 'blog') return `${SITE_URL}/blog`;
  if (route.type === 'blog-post') return `${SITE_URL}/blog/${route.slug}`;
  if (route.type === 'pricing') return `${SITE_URL}/pricing`;
  if (route.type === 'about') return `${SITE_URL}/about`;
  if (route.type === 'privacy-policy') return `${SITE_URL}/privacy-policy`;
  if (route.type === 'terms') return `${SITE_URL}/terms`;
  if (route.type === 'landing') return `${SITE_URL}/${route.slug}`;
  return `${SITE_URL}/`;
};

const setMetaTag = (selector: string, attributes: Record<string, string>) => {
  let tag = document.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'name' || key === 'property' || key === 'itemprop') tag?.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'content') tag?.setAttribute('content', value);
    else if (key !== 'name' && key !== 'property' && key !== 'itemprop') {
      tag?.setAttribute(key, value);
    }
  });
  return tag;
};

const setStructuredData = (data: Record<string, unknown>) => {
  let script = document.querySelector('script[data-seo="page-structured-data"]') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo', 'page-structured-data');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

export const SEOHead: React.FC<SEOHeadProps> = ({ currentRoute }) => {
  useEffect(() => {
    let title = 'Sticker Maker — Design Custom Stickers Free in Seconds';
    let description = 'Create custom die-cut stickers online in seconds with a browser-based editor, transparent PNG download, and no signup required.';
    let canonicalUrl = `${SITE_URL}/`;
    let pageType = 'WebPage';

    if (currentRoute.type === 'editor') {
      title = 'Sticker Maker Online Editor — Free Custom Die-Cut Tool';
      description = 'Design custom stickers with a live die-cut border generator, smart background removal, curved text, and transparent PNG export.';
      canonicalUrl = `${SITE_URL}/create/stickers`;
      pageType = 'WebPage';
    } else if (currentRoute.type === 'templates') {
      title = 'Sticker Templates Library — 1000+ Ready-to-Use Designs';
      description = 'Browse trending die-cut sticker templates across WhatsApp, Urdu calligraphy, memes, aesthetic quotes, and business logos.';
      canonicalUrl = `${SITE_URL}/templates`;
      pageType = 'CollectionPage';
    } else if (currentRoute.type === 'category') {
      const catData = CATEGORIES_DATA[currentRoute.category];
      if (catData) {
        title = catData.metaTitle;
        description = catData.metaDescription;
      }
      canonicalUrl = `${SITE_URL}/sticker-maker/${currentRoute.category}`;
      pageType = 'CollectionPage';
    } else if (currentRoute.type === 'landing') {
      if (currentRoute.slug === 'free-sticker-maker') {
        title = 'Free Sticker Maker — Design Custom Stickers Online';
        description = 'Make free custom stickers online with templates, text, transparent PNG export, and instant die-cut borders.';
      } else if (currentRoute.slug === 'whatsapp-sticker-maker') {
        title = 'WhatsApp Sticker Maker — Create Custom Stickers Free';
        description = 'Design custom WhatsApp stickers online in seconds with 512x512 export, transparent background, and sticker pack tools.';
      } else if (currentRoute.slug === 'photo-to-sticker') {
        title = 'Photo to Sticker Converter — Free Online Tool | StickerMaker';
        description = 'Turn any photo into a sticker for free with instant background removal, die-cut borders, and transparent PNG download in seconds.';
      } else if (currentRoute.slug === 'custom-sticker-maker') {
        title = 'Custom Sticker Maker — Make Stickers from Your Photos';
        description = 'Create custom stickers online from photos, quotes, logos, and templates with no design experience required.';
      } else {
        title = 'Sticker Maker — Design Custom Stickers Free in Seconds';
        description = 'Create custom die-cut stickers online in seconds with a browser-based editor and no signup required.';
      }
      canonicalUrl = `${SITE_URL}/${currentRoute.slug}`;
      pageType = 'WebPage';
    } else if (currentRoute.type === 'blog') {
      title = 'Sticker Design Guides & 300 DPI Printing Specs — StickerMaker';
      description = 'Free guides on making WhatsApp stickers, sizing stickers for vinyl printing, and building die-cut white borders.';
      canonicalUrl = `${SITE_URL}/blog`;
      pageType = 'Blog';
    } else if (currentRoute.type === 'blog-post') {
      const post = BLOG_POSTS.find((p) => p.slug === currentRoute.slug);
      if (post) {
        title = `${post.title} — StickerMaker Guide`;
        description = post.excerpt;
      }
      canonicalUrl = `${SITE_URL}/blog/${currentRoute.slug}`;
      pageType = 'Article';
    } else if (currentRoute.type === 'pricing') {
      title = 'Pricing — Free vs Pro Sticker Maker Tool';
      description = 'Create stickers for free or unlock advanced exports, batch packs, and custom font workflows for creators.';
      canonicalUrl = `${SITE_URL}/pricing`;
    } else if (currentRoute.type === 'about') {
      title = 'About StickerMaker — A Faster Canva Alternative';
      description = 'Learn how StickerMaker helps creators make sticker designs fast without bloated software or mandatory signups.';
      canonicalUrl = `${SITE_URL}/about`;
    } else if (currentRoute.type === 'privacy-policy') {
      title = 'Privacy Policy — StickerMaker';
      description = 'Read how StickerMaker handles browser-based sticker creation, usage data, and waitlist information.';
      canonicalUrl = `${SITE_URL}/privacy-policy`;
    } else if (currentRoute.type === 'terms') {
      title = 'Terms of Service — StickerMaker';
      description = 'Review the StickerMaker terms for using the free sticker editor, templates, and export features.';
      canonicalUrl = `${SITE_URL}/terms`;
    }

    document.title = title;
    canonicalUrl = getCanonicalUrl(currentRoute);

    setMetaTag('meta[name="description"]', { name: 'description', content: description });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    setMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: 'StickerMaker' });
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMetaTag('meta[name="twitter:url"]', { name: 'twitter:url', content: canonicalUrl });
    setMetaTag('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    setMetaTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    if (document.querySelector('link[rel="canonical"]')) {
      const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      canonicalLink.setAttribute('href', canonicalUrl);
      canonicalLink.setAttribute('rel', 'canonical');
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': pageType,
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        url: SITE_URL,
        name: 'StickerMaker',
      },
      publisher: {
        '@type': 'Organization',
        name: 'StickerMaker',
        url: SITE_URL,
      },
      applicationCategory: pageType === 'WebPage' ? 'DesignApplication' : undefined,
    };

    setStructuredData(structuredData);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentRoute]);

  return null;
};
