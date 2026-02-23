import type { Area } from 'react-easy-crop';

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    if (!url.startsWith('blob:')) {
      image.crossOrigin = 'anonymous';
    }
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (e) => reject(e));
    image.src = url;
  });

export const getCroppedImage = async (
  imageUrl: string,
  area: Area,
  fileName: string
): Promise<File> => {
  const image = await createImage(imageUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2d context not available');

  let w = Math.max(1, Math.floor(area.width));
  let h = Math.max(1, Math.floor(area.height));
  if (w > image.naturalWidth || h > image.naturalHeight) {
    w = Math.min(w, image.naturalWidth);
    h = Math.min(h, image.naturalHeight);
  }
  canvas.width = w;
  canvas.height = h;
  const sx = Math.max(0, Math.floor(area.x));
  const sy = Math.max(0, Math.floor(area.y));
  const sw = Math.max(1, Math.min(area.width, image.naturalWidth - sx));
  const sh = Math.max(1, Math.min(area.height, image.naturalHeight - sy));
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas toBlob failed'));
          return;
        }
        const file = new File([blob], fileName, { type: blob.type });
        resolve(file);
      },
      'image/jpeg',
      0.92
    );
  });
};

export type CropStateForExport = {
  urls: string[];
  croppedAreasPixels: (Area | null)[];
};

const getFullImageArea = async (imageUrl: string): Promise<Area> => {
  const image = await createImage(imageUrl);
  return {
    x: 0,
    y: 0,
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
};

export const getCroppedImages = async (
  files: File[],
  urls: string[],
  croppedAreasPixels: (Area | null)[]
): Promise<File[]> => {
  const results: File[] = [];
  for (let i = 0; i < files.length; i++) {
    const url = urls[i];
    const file = files[i];
    if (!url || !file) continue;
    const area =
      croppedAreasPixels[i] ?? (await getFullImageArea(url));
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'image';
    const cropped = await getCroppedImage(url, area, `${baseName}.jpg`);
    results.push(cropped);
  }
  return results;
};
