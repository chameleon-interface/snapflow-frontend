import type { Area } from 'react-easy-crop';

export type CreatePostPayload = {
  description: string;
  fileIds: string[];
};

export type PostMedia = {
  postMediaId: number;
  fileId: string;
  url: string;
};

export type PostOwner = {
  ownerId: number;
  username: string;
  avatarUrl: string;
};

export type BasePostResponse = {
  id: number;
  description: string;
  createdAt: string;
  postMedias: PostMedia[];
  owner: PostOwner;
};

export type CreatePostResponse = BasePostResponse & {
  status: 'PUBLISHED';
};

export type CreateDraftResponse = BasePostResponse & {
  status: 'DRAFT';
};

/** Шаги создания поста */
export const CREATE_POST_STEPS = [
  'addPhotos',
  'cropping',
  'filters',
  'publish',
] as const;
export type CreatePostStep = (typeof CREATE_POST_STEPS)[number];

/** Позиция кропа (x, y в долях) */
export type CropPosition = { x: number; y: number };

/** Состояние редактора поста (кроп, зум, фильтры по слайдам) */
export type DraftPostState = {
  currentSlideIndex: number;
  crops: CropPosition[];
  zooms: number[];
  croppedAreasPixels: (Area | null)[];
  aspectByIndex: Record<number, number>;
  filterBySlide: Record<number, string>;
};
