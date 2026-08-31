import React, { useState, useEffect } from 'react';
import { PageRoute, StickerCategory } from './types/sticker';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { StickerEditor } from './components/editor/StickerEditor';
import { CategoryPage } from './components/category/CategoryPage';
import { TemplatesPage } from './components/templates/TemplatesPage';
import { BlogPage } from './components/blog/BlogPage';
import { BlogPostPage } from './components/blog/BlogPostPage';
import { PricingPage } from './components/pricing/PricingPage';
import { AboutPage } from './components/about/AboutPage';
import { PrivacyPolicyPage } from './components/legal/PrivacyPolicyPage';
import { TermsPage } from './components/legal/TermsPage';
import { SEOHead } from './components/seo/SEOHead';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    // Parse initial URL path if available
    const path = window.location.pathname;
    if (path.startsWith('/create/stickers') || path.startsWith('/editor')) {
      return { type: 'editor' };
    }
    if (path.startsWith('/templates')) {
      return { type: 'templates' };
    }
    if (path === '/sticker-maker' || path === '/free-sticker-maker' || path === '/custom-sticker-maker') {
      return { type: 'landing', slug: path === '/sticker-maker' ? 'sticker-maker' : path === '/free-sticker-maker' ? 'free-sticker-maker' : 'custom-sticker-maker' };
    }
    if (path === '/whatsapp-sticker-maker') {
      return { type: 'landing', slug: 'whatsapp-sticker-maker' };
    }
    if (path === '/photo-to-sticker') {
      return { type: 'landing', slug: 'photo-to-sticker' };
    }
    if (path.startsWith('/sticker-maker/')) {
      const cat = path.replace('/sticker-maker/', '') as StickerCategory;
      return { type: 'category', category: cat };
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return { type: 'blog-post', slug };
    }
    if (path === '/blog') {
      return { type: 'blog' };
    }
    if (path === '/pricing') {
      return { type: 'pricing' };
    }
    if (path === '/about') {
      return { type: 'about' };
    }
    if (path === '/privacy-policy') {
      return { type: 'privacy-policy' };
    }
    if (path === '/terms') {
      return { type: 'terms' };
    }
    return { type: 'home' };
  });

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);

    // Update browser URL history
    let newPath = '/';
    if (route.type === 'editor') {
      newPath = '/create/stickers';
      if (route.category) newPath += `?category=${route.category}`;
      if (route.templateId) newPath += `&template=${route.templateId}`;
    } else if (route.type === 'templates') {
      newPath = '/templates';
      if (route.category) newPath += `?category=${route.category}`;
    } else if (route.type === 'category') {
      newPath = `/sticker-maker/${route.category}`;
    } else if (route.type === 'landing') {
      newPath = `/${route.slug}`;
    } else if (route.type === 'blog') {
      newPath = '/blog';
    } else if (route.type === 'blog-post') {
      newPath = `/blog/${route.slug}`;
    } else if (route.type === 'pricing') {
      newPath = '/pricing';
    } else if (route.type === 'about') {
      newPath = '/about';
    } else if (route.type === 'privacy-policy') {
      newPath = '/privacy-policy';
    } else if (route.type === 'terms') {
      newPath = '/terms';
    }

    window.history.pushState({}, '', newPath);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/create/stickers') || path.startsWith('/editor')) {
        setCurrentRoute({ type: 'editor' });
      } else if (path.startsWith('/templates')) {
        setCurrentRoute({ type: 'templates' });
      } else if (path === '/sticker-maker' || path === '/free-sticker-maker' || path === '/custom-sticker-maker') {
        setCurrentRoute({ type: 'landing', slug: path === '/sticker-maker' ? 'sticker-maker' : path === '/free-sticker-maker' ? 'free-sticker-maker' : 'custom-sticker-maker' });
      } else if (path === '/whatsapp-sticker-maker') {
        setCurrentRoute({ type: 'landing', slug: 'whatsapp-sticker-maker' });
      } else if (path === '/photo-to-sticker') {
        setCurrentRoute({ type: 'landing', slug: 'photo-to-sticker' });
      } else if (path.startsWith('/sticker-maker/')) {
        const cat = path.replace('/sticker-maker/', '') as StickerCategory;
        setCurrentRoute({ type: 'category', category: cat });
      } else if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '');
        setCurrentRoute({ type: 'blog-post', slug });
      } else if (path === '/blog') {
        setCurrentRoute({ type: 'blog' });
      } else if (path === '/pricing') {
        setCurrentRoute({ type: 'pricing' });
      } else if (path === '/about') {
        setCurrentRoute({ type: 'about' });
      } else if (path === '/privacy-policy') {
        setCurrentRoute({ type: 'privacy-policy' });
      } else if (path === '/terms') {
        setCurrentRoute({ type: 'terms' });
      } else {
        setCurrentRoute({ type: 'home' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const gtag = (window as any).gtag;
    if (typeof gtag !== 'function') return;

    const pagePath = `${window.location.pathname}${window.location.search}`;
    gtag('config', 'G-CBG6YSRTZ4', { page_path: pagePath });
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-rose-500 selection:text-white">
      {/* Dynamic SEO Meta Updates */}
      <SEOHead currentRoute={currentRoute} />

      {/* Main Global Navigation */}
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        {(currentRoute.type === 'home' || currentRoute.type === 'landing') && (
          <>
            {currentRoute.type === 'landing' && currentRoute.slug === 'whatsapp-sticker-maker' ? (
              <CategoryPage category="whatsapp" onNavigate={handleNavigate} />
            ) : currentRoute.type === 'landing' && currentRoute.slug === 'photo-to-sticker' ? (
              <CategoryPage category="whatsapp" onNavigate={handleNavigate} />
            ) : (
              <HomePage onNavigate={handleNavigate} />
            )}
          </>
        )}

        {currentRoute.type === 'templates' && (
          <TemplatesPage
            onNavigate={handleNavigate}
            initialCategory={currentRoute.category}
          />
        )}

        {currentRoute.type === 'editor' && (
          <StickerEditor
            initialCategory={currentRoute.category}
            initialTemplateId={currentRoute.templateId}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute.type === 'category' && (
          <CategoryPage
            category={currentRoute.category}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute.type === 'blog' && (
          <BlogPage onNavigate={handleNavigate} />
        )}

        {currentRoute.type === 'blog-post' && (
          <BlogPostPage
            slug={currentRoute.slug}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute.type === 'pricing' && (
          <PricingPage onNavigate={handleNavigate} />
        )}

        {currentRoute.type === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentRoute.type === 'privacy-policy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {currentRoute.type === 'terms' && (
          <TermsPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer (hidden inside active editor for maximum canvas workspace on small screens) */}
      {currentRoute.type !== 'editor' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
