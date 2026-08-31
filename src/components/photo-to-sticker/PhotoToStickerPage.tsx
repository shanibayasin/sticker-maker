import React, { useRef, useState } from 'react';
import { PageRoute } from '../../types/sticker';
import { removeBackgroundLocally, renderDieCutStickerBorder, copyCanvasToClipboard, downloadCanvasAsPNG } from '../../utils/canvasHelper';
import {
  ArrowRight,
  Camera,
  Check,
  Copy,
  Download,
  ImageUp,
  Loader2,
  RefreshCcw,
  Sparkles,
  Wand2,
} from 'lucide-react';

interface PhotoToStickerPageProps {
  onNavigate: (route: PageRoute) => void;
}

const DEFAULT_BORDER_WIDTH = 8;

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image.'));
    img.src = src;
  });

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });

const dataUrlToCanvas = async (src: string): Promise<HTMLCanvasElement> => {
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width || 600;
  canvas.height = img.naturalHeight || img.height || 600;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas is not available in this browser.');
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const PhotoToStickerPage: React.FC<PhotoToStickerPageProps> = ({ onNavigate }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [pendingImageSrc, setPendingImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const resetFlow = () => {
    setProcessedImage(null);
    setPendingImageSrc(null);
    setError(null);
    setCopyStatus(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processStickerSource = async (rawDataUrl: string, mode: 'remove' | 'keep') => {
    setIsProcessing(true);
    setError(null);
    setCopyStatus(null);
    setPendingImageSrc(null);

    try {
      const sourceForSticker = mode === 'remove' ? await removeBackgroundLocally(rawDataUrl, 45) : rawDataUrl;
      const img = await loadImage(sourceForSticker);

      const sourceCanvas = document.createElement('canvas');
      sourceCanvas.width = img.naturalWidth || img.width || 600;
      sourceCanvas.height = img.naturalHeight || img.height || 600;
      const ctx = sourceCanvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context is unavailable.');
      }
      ctx.drawImage(img, 0, 0, sourceCanvas.width, sourceCanvas.height);

      const dieCutCanvas = renderDieCutStickerBorder(sourceCanvas, DEFAULT_BORDER_WIDTH, '#FFFFFF', true);
      const finalDataUrl = dieCutCanvas.toDataURL('image/png');
      setProcessedImage(finalDataUrl);
    } catch (uploadError) {
      console.error(uploadError);
      setError('We could not finish the sticker conversion. Please try another photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessFile = async (file: File | null | undefined) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    try {
      const rawDataUrl = await fileToDataUrl(file);
      setPendingImageSrc(rawDataUrl);
      setError(null);
      setCopyStatus(null);
    } catch (uploadError) {
      console.error(uploadError);
      setError('We could not read that image file. Please try another photo.');
    }
  };

  const handleCopy = async () => {
    if (!processedImage) return;

    try {
      const canvas = await dataUrlToCanvas(processedImage);
      const copied = await copyCanvasToClipboard(canvas, 1);
      setCopyStatus(copied ? 'Sticker copied to clipboard.' : 'Clipboard not available, downloading instead.');
      if (!copied) {
        await downloadCanvasAsPNG(canvas, 'photo-to-sticker.png', 1);
      }
    } catch (copyError) {
      console.error(copyError);
      setCopyStatus('Copy failed. Please try downloading the sticker instead.');
    }
  };

  const handleDownload = async () => {
    if (!processedImage) return;

    try {
      const canvas = await dataUrlToCanvas(processedImage);
      await downloadCanvasAsPNG(canvas, 'photo-to-sticker.png', 1);
      setCopyStatus('Sticker downloaded.');
    } catch (downloadError) {
      console.error(downloadError);
      setCopyStatus('Download failed. Please try again.');
    }
  };

  const handleCustomizeFurther = () => {
    if (!processedImage) return;
    sessionStorage.setItem('stickermaker_photo_to_sticker_processed', processedImage);
    onNavigate({ type: 'editor' });
  };

  const triggerFilePicker = () => fileInputRef.current?.click();

  const uploadBlock = (
    <div
      className={`relative w-full rounded-[28px] border-2 border-dashed p-5 sm:p-8 transition-all ${
        isDragOver
          ? 'border-rose-400 bg-rose-50 shadow-lg shadow-rose-100'
          : 'border-neutral-300 bg-white hover:border-rose-300 hover:bg-rose-50/40'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        void handleProcessFile(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm">
          <ImageUp className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">Drop your photo here</h2>
          <p className="text-sm sm:text-base text-neutral-600">PNG, JPG, or WebP — choose whether to remove the background or keep it for meme-style stickers.</p>
        </div>

        <button
          type="button"
          onClick={triggerFilePicker}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-rose-600 min-h-[44px]"
        >
          <Camera className="h-4 w-4" />
          <span>Select Photo</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void handleProcessFile(e.target.files?.[0])}
        />

        {pendingImageSrc && (
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-neutral-50 p-3 text-left shadow-sm">
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void processStickerSource(pendingImageSrc, 'remove')}
                className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
              >
                Remove Background
              </button>
              <button
                type="button"
                onClick={() => void processStickerSource(pendingImageSrc, 'keep')}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                Keep Original Background
              </button>
            </div>
            <p className="mt-2 text-[11px] text-neutral-500">Tip: Keep the background for meme-style stickers.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-rose-700">
            <Sparkles className="h-3.5 w-3.5" />
            Photo to Sticker
          </div>
          <h1 className="mt-5 text-[2rem] font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Photo to Sticker Converter — Turn Any Photo Into a Sticker Free
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-lg">
            Upload a photo and we instantly remove the background, add a clean die-cut border, and prepare a sticker-ready PNG you can copy or download.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {!processedImage ? (
            <>{uploadBlock}</>
          ) : (
            <div className="rounded-[28px] border border-neutral-200 bg-neutral-50 p-4 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <div className="checkerboard-preview mx-auto flex max-w-md items-center justify-center overflow-hidden rounded-[22px] border border-neutral-200 bg-white">
                    <img src={processedImage} alt="Processed sticker preview" className="max-h-[440px] w-full object-contain p-4" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <Check className="h-4 w-4" />
                    Sticker ready
                  </div>

                  <h2 className="text-2xl font-extrabold text-neutral-900">Your sticker is ready</h2>
                  <p className="text-sm text-neutral-600">
                    Background removal and a white die-cut border have already been applied. You can immediately copy, download, or continue editing in the full studio.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 min-h-[44px]"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy to Clipboard</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-bold text-neutral-800 transition hover:bg-neutral-50 min-h-[44px]"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PNG</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCustomizeFurther}
                      className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-600 min-h-[44px]"
                    >
                      <Wand2 className="h-4 w-4" />
                      <span>Customize Further</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={resetFlow}
                      className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-bold text-neutral-800 transition hover:bg-neutral-50 min-h-[44px]"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      <span>Convert Another Photo</span>
                    </button>
                  </div>

                  {copyStatus && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{copyStatus}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm font-semibold text-rose-700">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Removing background...</span>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
          )}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Upload your photo',
              'We remove the background',
              'Download or copy your sticker',
            ].map((step, index) => (
              <div key={step} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-left">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-extrabold text-white">{index + 1}</div>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Step {index + 1}</span>
                </div>
                <p className="text-base font-semibold text-neutral-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
