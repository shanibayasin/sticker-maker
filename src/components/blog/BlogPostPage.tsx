import React from 'react';
import { PageRoute } from '../../types/sticker';
import { BLOG_POSTS } from '../../data/blogData';
import { ArrowLeft, Clock, Scissors, Sparkles, Share2, Check } from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

// Helper to parse **bold** text safely
const parseBold = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-neutral-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContentBlock = (text: string, pIndex: number) => {
    if (text.startsWith('### ')) {
      return (
        <h3 key={pIndex} className="text-xl font-extrabold text-neutral-900 pt-4 pb-1 border-b border-neutral-100">
          {text.replace('### ', '')}
        </h3>
      );
    }

    const lines = text.split('\n');
    if (lines.length > 1 && lines.some((l) => l.startsWith('- ') || /^\d+\.\s/.test(l) || l.startsWith('### '))) {
      return (
        <div key={pIndex} className="space-y-2.5">
          {lines.map((line, lIndex) => {
            if (line.startsWith('### ')) {
              return (
                <h3 key={lIndex} className="text-lg font-bold text-neutral-900 pt-3">
                  {line.replace('### ', '')}
                </h3>
              );
            }
            if (line.startsWith('- ')) {
              const bulletContent = line.replace('- ', '');
              return (
                <div key={lIndex} className="flex items-start gap-2.5 pl-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base leading-relaxed">{parseBold(bulletContent)}</span>
                </div>
              );
            }
            if (/^\d+\.\s/.test(line)) {
              const numMatch = line.match(/^(\d+\.)\s(.*)$/);
              return (
                <div key={lIndex} className="flex items-start gap-2.5 pl-2">
                  <span className="font-bold text-rose-600 text-sm shrink-0">{numMatch ? numMatch[1] : '•'}</span>
                  <span className="text-neutral-700 text-sm sm:text-base leading-relaxed">{numMatch ? parseBold(numMatch[2]) : parseBold(line)}</span>
                </div>
              );
            }
            return (
              <p key={lIndex} className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                {parseBold(line)}
              </p>
            );
          })}
        </div>
      );
    }

    return (
      <p key={pIndex} className="text-neutral-700 text-sm sm:text-base leading-relaxed">
        {parseBold(text)}
      </p>
    );
  };

  return (
    <div className="w-full flex flex-col items-center py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-8">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <button
            onClick={() => onNavigate({ type: 'blog' })}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Guides</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 bg-neutral-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>

        {/* Header Title & Metadata */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {post.category}
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200 shrink-0 shadow-2xs">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">{post.byline || 'StickerMaker Team'}</p>
              <p className="text-[11px] text-neutral-500">Design & Guides • {post.date}</p>
            </div>
          </div>
        </header>

        {/* Lead Excerpt */}
        <p className="text-base text-neutral-700 font-medium leading-relaxed bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
          {post.excerpt}
        </p>

        {/* Main Article Content */}
        <div className="max-w-none text-neutral-700 leading-relaxed space-y-6">
          {post.content.map((paragraph, index) => renderContentBlock(paragraph, index))}
        </div>

        {/* Inline Article CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-2xl p-8 text-center space-y-4 shadow-md">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try It Yourself Free</span>
          </div>
          <h3 className="text-2xl font-extrabold">Ready to Create Your Custom Sticker?</h3>
          <p className="text-xs text-rose-100 max-w-md mx-auto">
            Use our free web editor with automatic die-cut borders, AI background removal, and 300 DPI exports.
          </p>
          <button
            onClick={() => onNavigate({ type: 'editor' })}
            className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 font-bold text-xs px-6 py-3 rounded-xl shadow transition-colors"
          >
            <Scissors className="w-4 h-4" />
            <span>Launch Sticker Maker</span>
          </button>
        </div>
      </div>
    </div>
  );
};
