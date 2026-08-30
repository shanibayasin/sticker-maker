import React from 'react';
import { PageRoute } from '../../types/sticker';
import { Check, Scissors, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col items-center py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Pricing Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Simple & Transparent
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Free Forever for Standard Use
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Create and export unlimited transparent stickers without watermark restrictions. Upgrade only if you need multi-sticker batch export and custom brand fonts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Starter Tier */}
          <div className="bg-neutral-50 rounded-2xl p-8 border-2 border-neutral-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-900">Free Creator</h3>
                <span className="text-xs font-bold text-neutral-600 bg-white border border-neutral-200 px-2.5 py-1 rounded-full">
                  No Login Required
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-900">$0</span>
                <span className="text-xs text-neutral-500 font-medium">/ lifetime</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Everything you need to create custom WhatsApp, Discord, and Instagram stickers.
              </p>

              <ul className="space-y-3 pt-4 border-t border-neutral-200 text-xs text-neutral-700">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited Transparent PNG Downloads</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Auto Die-Cut White Border (0px - 24px)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>AI Background Removal</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All 1,000+ Ready Sticker Templates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Urdu Nastaliq Calligraphy Presets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Print-Ready 300 DPI PDF Exports</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate({ type: 'editor' })}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3.5 rounded-xl transition-colors"
            >
              Start Making Stickers Now — Free
            </button>
          </div>

          {/* Pro Merch Tier */}
          <div className="bg-white rounded-2xl p-8 border-2 border-rose-500 shadow-xl flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              Popular for Shops
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-900">Pro Studio & Merch</h3>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  For Etsy & Businesses
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-900">$9</span>
                <span className="text-xs text-neutral-500 font-medium">/ month</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Advanced batch tooling for commercial sticker sellers and merch designers.
              </p>

              <ul className="space-y-3 pt-4 border-t border-neutral-200 text-xs text-neutral-700">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-semibold">Everything in Free Tier</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Multi-Sticker Pack Batch Export (.ZIP)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Custom Font Uploads (OTF / TTF)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Commercial Royalty-Free License for Resale</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>20% Discount on Physical Vinyl Print Orders</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Priority Cloud Rendering Pipeline</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate({ type: 'editor' })}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-colors"
            >
              Try Pro Features in Studio
            </button>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-neutral-900">No Hidden Traps or Watermark Paywalls</p>
              <p className="text-neutral-500">Unlike other tools, our free plan never puts ugly watermarks over your artwork.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate({ type: 'editor' })}
            className="text-rose-600 font-bold hover:underline shrink-0"
          >
            Open Free Editor →
          </button>
        </div>
      </div>
    </div>
  );
};
