import type { Area } from 'react-easy-crop';
import { getCroppedImages } from './getCroppedImage';

export const runCroppingExport = async (
  files: File[],
  croppedAreasPixels: (Area | null)[]
): Promise<File[]> => {
  const urls = files.map((f) => URL.createObjectURL(f));
  try {
    return await getCroppedImages(files, urls, croppedAreasPixels);
  } finally {
    urls.forEach((u) => URL.revokeObjectURL(u));
  }
};
