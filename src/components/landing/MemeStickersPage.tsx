import React, { useMemo } from 'react';
import { PageRoute, StickerTemplate } from '../../types/sticker';
import { STICKER_TEMPLATES } from '../../data/templatesData';
import { DieCutStickerCard } from '../common/DieCutStickerCard';
import { ArrowRight, Scissors, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';

interface MemeStickersPageProps {
  onNavigate: (route: PageRoute) => void;
}

const memeTemplates = STICKER_TEMPLATES.filter((template) => template.category === 'funny').slice(0, 4);

const faqs = [
  {
    question: 'How do I make a meme sticker for WhatsApp?',
    answer: 'Open the editor, pick a funny template or upload your own image, add a caption, and export a transparent 512x512 PNG. It works perfectly in WhatsApp chats and group replies.',
  },
  {
    question: 'Can I keep the background on my meme sticker?',
    answer: 'Yes. Our editor lets you keep the original background for authentic meme-style stickers while still adding a white die-cut border around the image edge for a polished sticker look.',
  },
  {
    question: "What's the best size for meme stickers?",
    answer: 'For WhatsApp, 512x512 is ideal. For physical prints, 3x3 inches at 300 DPI gives a crisp result and plenty of room for meme text and bold comic shapes.',
  },
  {
    question: 'How do I make a meme sticker pack?',
    answer: 'Create multiple sticker designs in the editor, tweak the text and borders, then use the pack workflow or export each sticker as a transparent PNG for a themed meme set.',
  },
  {
    question: 'Do I need to sign up to make meme stickers?',
    answer: 'No. You can create, customize, and export your meme stickers for free without creating an account or paying for a plan.',
  },
];

export const MemeStickersPage: React.FC<MemeStickersPageProps> = ({ onNavigate }) => {
  const introText = useMemo(
    () =>
      'Meme stickers are the fastest way to turn everyday jokes, reactions, and inside references into shareable visual humor. Whether you are making a viral reaction for WhatsApp, a sarcastic sticker pack for friends, or a custom funny clip for your next chat, StickerMaker makes it easy. You can upload any photo, add bold text, and keep the original background intact for authentic meme style when you want the full scene to stay visible. Best of all, there is no signup required and exports are free, so you can go from idea to sticker in seconds without extra steps or confusing software.',
    [ ]
  );

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <section className="w-full bg-gradient-to-b from-rose-50 via-white to-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-rose-700">
                <Sparkles className="h-3.5 w-3.5" />
                Meme Sticker Maker
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
                Meme Sticker Maker — Create Funny Stickers Free
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                {introText}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'editor' })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-rose-600 min-h-[46px]"
                >
                  <Scissors className="h-4 w-4" />
                  <span>Start Making Meme Stickers</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  No signup needed
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  Free export
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  Meme style background support
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="grid grid-cols-2 gap-3">
                {memeTemplates.map((template) => (
                  <div key={template.id} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-2">
                    <div className="checkerboard-bg rounded-xl p-2">
                      <div className="aspect-square">
                        <DieCutStickerCard
                          template={template}
                          onNavigate={onNavigate}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-neutral-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600">Popular Meme Templates</span>
              <h2 className="mt-2 text-2xl font-extrabold text-neutral-900 sm:text-3xl">Funny sticker presets ready to customize</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'editor', category: 'funny' })}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-bold text-neutral-700 transition hover:bg-neutral-100"
            >
              <Sparkles className="h-3.5 w-3.5 text-rose-500" />
              <span>Open Funny Templates</span>
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {memeTemplates.map((template) => (
              <DieCutStickerCard key={template.id} template={template} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600">FAQ</span>
            <h2 className="mt-2 text-2xl font-extrabold text-neutral-900 sm:text-3xl">Meme sticker questions answered</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
                <h3 className="flex items-start gap-2 text-sm font-bold text-neutral-900 sm:text-base">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span>{faq.question}</span>
                </h3>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
