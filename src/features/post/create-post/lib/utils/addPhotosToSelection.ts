import {
  getPhotoNames,
  processSelectedFiles,
  MAX_PHOTOS_MULTIPLE,
  type ValidationError,
} from '@/shared/lib';

export type AddPhotosToSelectionContext = {
  originalPhotos: File[];
  setOriginalPhotos: (photos: File[]) => void;
  setError: (message: string | null) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export const addPhotosToSelection = (
  files: File[],
  {
    originalPhotos,
    setOriginalPhotos,
    setError,
    t,
  }: AddPhotosToSelectionContext,
): void => {
  setError(null);
  const dt = new DataTransfer();
  files.forEach((f) => dt.items.add(f));
  processSelectedFiles(dt.files, {
    multiple: true,
    alreadySelectedCount: originalPhotos.length,
    alreadySelectedNames: getPhotoNames(originalPhotos),
    onFilesProcessed: (fileList) => {
      if (!fileList?.length) return;
      const next = [...originalPhotos, ...Array.from(fileList)].slice(
        0,
        MAX_PHOTOS_MULTIPLE,
      );
      setOriginalPhotos(next);
    },
    onError: (error: ValidationError | null) => {
      if (!error) {
        setError(null);
        return;
      }
      setError(t(error.key, error.values));
    },
  });
};
