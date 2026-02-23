import { get, set, del } from 'idb-keyval';
import type { StoredDraft, DraftPostState, CreatePostStep } from '@/features/post/create-post/model/types';

const DRAFT_KEY = 'create-post-draft';

export const hasDraft = async (): Promise<boolean> => {
  const draft = await get<StoredDraft>(DRAFT_KEY);
  return draft != null && draft.photoBlobs?.length > 0;
};

export const saveDraft = async (draft: StoredDraft): Promise<void> => {
  await set(DRAFT_KEY, draft);
};

export const loadDraft = async (): Promise<StoredDraft | null> => {
  const draft = await get<StoredDraft>(DRAFT_KEY);
  return draft ?? null;
};

export const clearDraft = async (): Promise<void> => {
  await del(DRAFT_KEY);
};

export const buildStoredDraft = (
  selectedPhotos: File[],
  step: CreatePostStep,
  postState: DraftPostState
): StoredDraft => ({
  photoBlobs: selectedPhotos.map((f) => ({ blob: f, name: f.name })),
  step,
  postState: {
    currentSlideIndex: postState.currentSlideIndex,
    crops: [...postState.crops],
    zooms: [...postState.zooms],
    croppedAreasPixels: [...postState.croppedAreasPixels],
    aspectByIndex: { ...postState.aspectByIndex },
    filterBySlide: { ...postState.filterBySlide },
  },
});
