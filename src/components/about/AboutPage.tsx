import React from 'react';
import { PageRoute } from '../../types/sticker';
import { Scissors, Zap, Shield, Sparkles, Check, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col items-center py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Our Mission & Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Why We Built a Faster, Simpler Sticker Maker
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            General design software like Canva is great for slide decks and resumes, but when you just want to turn a photo into a peelable die-cut sticker, it feels bloated, slow, and overly complicated.
          </p>
        </div>

        {/* Comparison Table vs Canva */}
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-neutral-900">How StickerMaker Compares to Canva</h2>
            <p className="text-xs text-neutral-500">Benchmark comparison for dedicated sticker creation workflows</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Feature / Metric</th>
                  <th className="py-3 px-4 text-rose-600 font-extrabold">StickerMaker (Our App)</th>
                  <th className="py-3 px-4 text-neutral-600">Canva Sticker Maker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Account Sign-up</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> 100% Optional (Zero Friction)
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">Mandatory Login Required</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Auto Die-Cut Contour</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> 1-Click Morphological Outline
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">Complex multi-step shadows</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Average App Load Time</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> 0.4 Seconds (Instant)
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">3.8+ Seconds</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Urdu Nastaliq Support</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Native Noto Nastaliq & Presets
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">Broken RTL Ligatures</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Transparent PNG Downloads</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Free for All Users
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">Locked behind Canva Pro</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-neutral-900">Laser-Focused Craft</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We don't try to be a video editor or presentation maker. Every slider and algorithm in StickerMaker is purpose-built for the sticker silhouette.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-neutral-900">Privacy & Performance</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Canvas transformations happen directly in your browser hardware, ensuring blazing 60 FPS interaction and private client-side processing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-neutral-900">True Universal Export</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Whether you need 512x512 WebP for WhatsApp or 300 DPI vectors with cut paths for vinyl machines, your export is ready instantly.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate({ type: 'editor' })}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-md transition-all"
          >
            <Scissors className="w-4 h-4" />
            <span>Launch Sticker Studio Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
