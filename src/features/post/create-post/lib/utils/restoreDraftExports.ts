import type { StoredDraft, CreatePostStep } from '@/features/post/create-post/model/types';
import { applyFiltersExport } from './applyFiltersExport';
import { runCroppingExport } from './runCroppingExport';

const DEFAULT_FILTER_ID = 'normal';

const blobEntriesToFiles = (photoBlobs: StoredDraft['photoBlobs']): File[] =>
  photoBlobs.map(({ blob, name }) => new File([blob], name, { type: blob.type }));

export type RestoreDraftResult = {
  files: File[];
  processedPhotos: File[];
  filteredPhotos?: File[];
  finalStep: CreatePostStep;
};

/** Выполняет экспорт кропов и фильтров для восстановления черновика до нужного шага. */
export const restoreDraftExports = async (
  draft: StoredDraft
): Promise<RestoreDraftResult> => {
  const files = blobEntriesToFiles(draft.photoBlobs);
  if (draft.step === 'cropping') {
    return { files, processedPhotos: [], finalStep: 'cropping' };
  }

  const processedPhotos = await runCroppingExport(
    files,
    draft.postState.croppedAreasPixels
  );
  if (draft.step === 'filters') {
    return { files, processedPhotos, finalStep: 'filters' };
  }

  const filteredPhotos = await applyFiltersExport(
    processedPhotos,
    (i) => draft.postState.filterBySlide[i] ?? DEFAULT_FILTER_ID
  );
  return { files, processedPhotos, filteredPhotos, finalStep: 'publish' };
};
