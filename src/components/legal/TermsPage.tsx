import React from 'react';
import { PageRoute } from '../../types/sticker';
import { ArrowLeft, ShieldAlert, Scale, FileText } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-neutral-50 text-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <button
          type="button"
          onClick={() => onNavigate({ type: 'home' })}
          className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 px-6 py-8 sm:px-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Terms of Service</h1>
            <p className="mt-3 text-sm text-white/90">Last updated: August 30, 2026</p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10 space-y-8 text-sm leading-7 text-neutral-700">
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Use of the Service</span>
              </div>
              <p>
                StickerMaker provides a free online tool for creating custom sticker designs, templates, and downloadable exports.
                By using the site, you agree to use it for lawful purposes and not for any activity that harms others, misuses the platform,
                or violates applicable laws.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>No Warranty</span>
              </div>
              <p>
                The service is provided on an “as is” and “as available” basis. We do not guarantee uninterrupted availability, error-free
                performance, or that any design output will meet a particular commercial or legal requirement.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>User-Generated Content</span>
              </div>
              <p>
                You remain responsible for any images, text, logos, or other content you upload or generate using the tool. You must ensure you
                have the rights to use such content and that it does not infringe intellectual property, privacy, or other legal rights of others.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Scale className="w-4 h-4 text-rose-500" />
                <span>Free Service and Limitations</span>
              </div>
              <p>
                The core sticker maker is offered free of charge. We may add or change premium features, pricing, or limits over time. We may also
                suspend or discontinue features if necessary for platform reliability, security, or business operations.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Limitation of Liability</span>
              </div>
              <p>
                To the maximum extent permitted by law, StickerMaker shall not be liable for indirect, incidental, consequential, or punitive damages
                arising from your use of the service, including any loss of data, revenue, or business opportunity.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Changes to These Terms</span>
              </div>
              <p>
                We may update these Terms of Service from time to time. Continued use of the service after changes are posted means you accept the updated terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
