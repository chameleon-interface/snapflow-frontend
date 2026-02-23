import { getFilterStyle } from './getFilterStyle';

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = url;
  });

const applyFilterToImage = async (
  imageUrl: string,
  filterId: string,
  fileName: string
): Promise<File> => {
  const image = await loadImage(imageUrl);
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2d context not available');

  const filterStyle = getFilterStyle(filterId);
  ctx.filter = filterStyle;
  ctx.drawImage(image, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas toBlob failed'));
          return;
        }
        const baseName = fileName.replace(/\.[^.]+$/, '') || 'image';
        resolve(new File([blob], `${baseName}.jpg`, { type: blob.type }));
      },
      'image/jpeg',
      0.92
    );
  });
};

export const applyFiltersExport = async (
  files: File[],
  filterAt: (index: number) => string
): Promise<File[]> => {
  const urls = files.map((f) => URL.createObjectURL(f));
  try {
    const results: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      const filtered = await applyFilterToImage(
        urls[i]!,
        filterAt(i),
        file.name
      );
      results.push(filtered);
    }
    return results;
  } finally {
    urls.forEach((u) => URL.revokeObjectURL(u));
  }
};
