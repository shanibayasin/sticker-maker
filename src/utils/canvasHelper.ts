import { jsPDF } from 'jspdf';

/**
 * Generates an auto die-cut sticker stroke around all visible pixels of a source canvas
 */
export function renderDieCutStickerBorder(
  sourceCanvas: HTMLCanvasElement,
  borderWidth: number,
  borderColor: string = '#FFFFFF',
  hasShadow: boolean = true
): HTMLCanvasElement {
  const width = Math.max(1, sourceCanvas.width);
  const height = Math.max(1, sourceCanvas.height);

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;
  const ctx = outputCanvas.getContext('2d');
  if (!ctx) return sourceCanvas;

  if (borderWidth <= 0) {
    if (hasShadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 6;
    }
    ctx.drawImage(sourceCanvas, 0, 0);
    return outputCanvas;
  }

  // Silhouette mask
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskCtx = maskCanvas.getContext('2d');
  if (!maskCtx) return sourceCanvas;

  maskCtx.drawImage(sourceCanvas, 0, 0);
  try {
    const imgData = maskCtx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Turn all non-transparent pixels into solid color for the contour outline
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 15) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      } else {
        data[i + 3] = 0;
      }
    }
    maskCtx.putImageData(imgData, 0, 0);
  } catch (err) {
    console.warn('Canvas mask data reading fallback', err);
  }

  // Dilate the silhouette mask in a radial 360 degree circle of steps
  const outlineCanvas = document.createElement('canvas');
  outlineCanvas.width = width;
  outlineCanvas.height = height;
  const outlineCtx = outlineCanvas.getContext('2d');
  if (!outlineCtx) return sourceCanvas;

  const steps = Math.max(16, Math.min(64, Math.floor(borderWidth * 2.5)));
  const radius = borderWidth;

  for (let r = 1; r <= radius; r += Math.max(1, radius / 8)) {
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * 2 * Math.PI;
      const dx = Math.cos(angle) * r;
      const dy = Math.sin(angle) * r;
      outlineCtx.drawImage(maskCanvas, dx, dy);
    }
  }

  // Tint outline with borderColor
  outlineCtx.globalCompositeOperation = 'source-in';
  outlineCtx.fillStyle = borderColor;
  outlineCtx.fillRect(0, 0, width, height);
  outlineCtx.globalCompositeOperation = 'source-over';

  // Draw drop-shadow under the entire sticker outline if enabled
  if (hasShadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    ctx.drawImage(outlineCanvas, 0, 0);
    ctx.shadowColor = 'transparent';
  }

  // Draw the thick die-cut outline
  ctx.drawImage(outlineCanvas, 0, 0);

  // Draw the original artwork crisp on top
  ctx.drawImage(sourceCanvas, 0, 0);

  return outputCanvas;
}

export type BackgroundRemovalMode = 'remove' | 'keep';

export function resolveStickerImageSource({
  rawImageSrc,
  processedImageSrc,
  backgroundRemovalMode,
}: {
  rawImageSrc: string;
  processedImageSrc?: string | null;
  backgroundRemovalMode: BackgroundRemovalMode;
}): string {
  if (backgroundRemovalMode === 'keep') {
    return rawImageSrc;
  }
  return processedImageSrc || rawImageSrc;
}

/**
 * Client-side background removal algorithm with customizable tolerance & edge feathering
 */
export async function removeBackgroundLocally(
  imageSrc: string,
  tolerance: number = 45
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = img.naturalWidth || img.width || 300;
      const h = img.naturalHeight || img.height || 300;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(imageSrc);
        return;
      }

      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Sample corner pixels
        const corners = [
          [0, 0],
          [w - 1, 0],
          [0, h - 1],
          [w - 1, h - 1],
        ];

        let bgR = 0, bgG = 0, bgB = 0;
        for (const [cx, cy] of corners) {
          const idx = (cy * w + cx) * 4;
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        }
        bgR /= 4;
        bgG /= 4;
        bgB /= 4;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const distToBg = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
          const isNearWhite = r > 238 && g > 238 && b > 238;

          if (distToBg < tolerance || isNearWhite) {
            data[i + 3] = 0; // Transparent
          } else if (distToBg < tolerance + 15) {
            data[i + 3] = Math.min(255, Math.floor(((distToBg - tolerance) / 15) * 255));
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('Background removal canvas error', err);
        resolve(imageSrc);
      }
    };
    img.onerror = () => {
      resolve(imageSrc);
    };
    img.src = imageSrc;
  });
}

/**
 * Conversion helper reusable for both download and clipboard copy actions
 */
export function canvasToPngBlob(
  canvas: HTMLCanvasElement,
  scaleMultiplier: number = 1
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    let targetCanvas = canvas;
    if (scaleMultiplier > 1) {
      const scaled = document.createElement('canvas');
      scaled.width = canvas.width * scaleMultiplier;
      scaled.height = canvas.height * scaleMultiplier;
      const sCtx = scaled.getContext('2d');
      if (sCtx) {
        sCtx.imageSmoothingEnabled = true;
        sCtx.imageSmoothingQuality = 'high';
        sCtx.drawImage(canvas, 0, 0, scaled.width, scaled.height);
        targetCanvas = scaled;
      }
    }

    targetCanvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Could not render canvas as PNG.'));
    }, 'image/png');
  });
}

/**
 * Copies a canvas-rendered PNG directly to the system clipboard.
 */
export async function copyCanvasToClipboard(
  canvas: HTMLCanvasElement,
  scaleMultiplier: number = 1
): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard || !window.isSecureContext) {
    return false;
  }

  if (typeof ClipboardItem === 'undefined') {
    return false;
  }

  try {
    const blob = await canvasToPngBlob(canvas, scaleMultiplier);
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
    return true;
  } catch (error) {
    console.warn('Clipboard image write failed:', error);
    return false;
  }
}

/**
 * Downloads a canvas as high-resolution transparent PNG
 */
export async function downloadCanvasAsPNG(
  canvas: HTMLCanvasElement,
  filename: string = 'custom-die-cut-sticker.png',
  scaleMultiplier: number = 1
) {
  const blob = await canvasToPngBlob(canvas, scaleMultiplier);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Downloads a canvas as print-ready 300 DPI PDF with jsPDF
 */
export function downloadCanvasAsPrintPDF(canvas: HTMLCanvasElement, filename: string = 'print-ready-sticker-300dpi.pdf') {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [4, 4], // 4x4 inch sticker print format
  });

  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', 0.2, 0.2, 3.6, 3.6);
  pdf.save(filename);
}
