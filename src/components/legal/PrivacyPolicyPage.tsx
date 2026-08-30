import React from 'react';
import { PageRoute } from '../../types/sticker';
import { ArrowLeft, Mail, ShieldCheck, Database, Cookie, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
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
          <div className="bg-gradient-to-r from-rose-500 to-amber-400 px-6 py-8 sm:px-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Privacy Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Privacy Policy</h1>
            <p className="mt-3 text-sm text-white/90">Last updated: August 30, 2026</p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10 space-y-8 text-sm leading-7 text-neutral-700">
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Overview</span>
              </div>
              <p>
                StickerMaker respects your privacy. This Privacy Policy explains what information we collect, how we use it,
                and what choices you have when you use our website and sticker creator tools.
              </p>
              <p>
                We aim to keep the experience simple and privacy-friendly. Most of the app runs in the browser on your device,
                and image processing is performed locally in the browser before you export or download your design.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Database className="w-4 h-4 text-rose-500" />
                <span>Information We Collect</span>
              </div>
              <div className="space-y-3">
                <p><strong>Information you provide directly:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>When you use the order waitlist form, we may collect your email address, quantity, sticker finish, and sticker name.</li>
                  <li>This information is used only to manage interest in printed sticker orders and to contact you about relevant updates or offers.</li>
                </ul>

                <p><strong>Information processed locally in your browser:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Uploaded images and design edits are processed on your device in the browser for tasks such as background removal, resizing, cropping, arranging text, and exporting files.</li>
                  <li>These images are not uploaded to a server for the background-removal feature because the tool works locally in-browser.</li>
                  <li>We do not need to send your uploaded artwork to a backend for the core sticker design workflow.</li>
                </ul>

                <p><strong>Automatic information:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Basic technical information such as browser type, device type, page usage, and general analytics may be collected by third-party services used for website operation and measurement.</li>
                  <li>We do not intentionally collect sensitive personal information beyond what is necessary for the service to function.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Cookie className="w-4 h-4 text-rose-500" />
                <span>Cookies and Local Storage</span>
              </div>
              <p>
                We use standard browser storage technologies to improve usability and remember editor state. In particular,
                localStorage may be used to save progress or the current sticker editor state so the app can restore your work
                when you return.
              </p>
              <p>
                Cookies may also be used by third-party services such as Google Fonts, analytics tools, and future advertising
                services. These help provide a better experience and ensure our site functions normally across visits.
              </p>
              <p>
                You can manage or disable cookies in your browser settings, but disabling them may affect certain site features.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Eye className="w-4 h-4 text-rose-500" />
                <span>Third-Party Services</span>
              </div>
              <div className="space-y-3">
                <p>We use the following third-party services:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Google Fonts:</strong> We load typefaces from Google’s servers to provide the app’s typography and design styles.</li>
                  <li><strong>Unsplash:</strong> Some template and demo imagery may be loaded from Unsplash when presented in the app or design previews.</li>
                  <li><strong>Google AdSense (if enabled in the future):</strong> Third-party vendors, including Google, may use cookies to serve ads based on a user’s prior visits to this site or other sites. This is standard advertising behavior for AdSense-compatible sites.</li>
                </ul>
                <p>
                  These third parties operate under their own privacy policies, and their cookies are managed by those providers.
                  If AdSense is later enabled, personalized advertising may use cookies and other identifiers to deliver relevant ads.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>How Uploaded Images Are Handled</span>
              </div>
              <p>
                Your uploaded images are used only within the current browser session to help you create stickers. The background
                removal workflow is processed locally in-browser, which is a privacy-positive design choice because it reduces the
                need to send user images to a remote server for processing.
              </p>
              <p>
                We do not rely on server-side background removal for the main tool. This means your artwork stays on your device
                while you work on it, and exported files are generated locally before they are downloaded by you.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Your Rights and Requests</span>
              </div>
              <p>
                You may request access to, correction of, or deletion of personal data we hold about you, including requests related
                to waitlist entries or contact information.
              </p>
              <p>
                To make a privacy request, contact us using the email below. We will respond in a reasonable timeframe and take steps
                to fulfill valid requests where legally required.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Mail className="w-4 h-4 text-rose-500" />
                <span>Contact Us</span>
              </div>
              <p>
                If you have questions about this Privacy Policy, your data, or a deletion request, please contact us at:
              </p>
              <p className="font-semibold text-rose-600">privacy@yourdomain.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
