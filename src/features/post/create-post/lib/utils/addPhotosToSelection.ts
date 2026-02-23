import {
  getPhotoNames,
  processSelectedFiles,
} from '@/shared/ui/SelectPhotos/lib';
import { MAX_PHOTOS_MULTIPLE } from '@/shared/ui/SelectPhotos/model/constants';

export type AddPhotosToSelectionContext = {
  selectedPhotos: File[];
  setSelectedPhotos: (photos: File[]) => void;
  setError: (message: string | null) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export const addPhotosToSelection = (
  files: File[],
  {
    selectedPhotos,
    setSelectedPhotos,
    setError,
    t,
  }: AddPhotosToSelectionContext
): void => {
  setError(null);
  const dt = new DataTransfer();
  files.forEach((f) => dt.items.add(f));
  processSelectedFiles(dt.files, {
    multiple: true,
    alreadySelectedCount: selectedPhotos.length,
    alreadySelectedNames: getPhotoNames(selectedPhotos),
    onFilesProcessed: (fileList) => {
      if (!fileList?.length) return;
      const next = [...selectedPhotos, ...Array.from(fileList)].slice(
        0,
        MAX_PHOTOS_MULTIPLE
      );
      setSelectedPhotos(next);
    },
    onError: setError,
    t,
  });
};
