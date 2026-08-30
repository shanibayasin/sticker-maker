import React from 'react';
import { PageRoute } from '../../types/sticker';
import { BLOG_POSTS } from '../../data/blogData';
import { BookOpen, Clock, ArrowRight, Sparkles, Scissors } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Blog Hero */}
      <section className="w-full bg-gradient-to-b from-rose-50/60 via-white to-white py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sticker Design Academy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Guides, Sizing Specs & Design Tutorials
          </h1>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to master custom sticker creation for WhatsApp, Cricut printing, Instagram stories, and vector die-cut paths.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                onClick={() => onNavigate({ type: 'blog-post', slug: post.slug })}
                className="bg-neutral-50/50 hover:bg-white rounded-2xl border border-neutral-200 hover:border-rose-300 hover:shadow-lg transition-all p-6 cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-neutral-900 group-hover:text-rose-600 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <Scissors className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700">{post.byline || 'StickerMaker Team'}</span>
                  </div>
                  <span className="text-xs font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Jump CTA */}
      <section className="w-full py-12 bg-neutral-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl font-bold">Ready to Put These Guides into Practice?</h3>
          <p className="text-xs text-neutral-400">Launch the canvas studio now and make your first sticker in under 60 seconds.</p>
          <button
            onClick={() => onNavigate({ type: 'editor' })}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-colors"
          >
            <Scissors className="w-4 h-4" />
            <span>Open Free Sticker Maker</span>
          </button>
        </div>
      </section>
    </div>
  );
};
