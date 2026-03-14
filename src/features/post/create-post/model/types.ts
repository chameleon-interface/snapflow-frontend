import type { Area } from 'react-easy-crop';

/** Payload для API создания поста. location пока не поддерживается бэкендом. */
export type CreatePostPayload = {
  profileId: number;
  description: string;
  photoFile: File[];
};

export type CreatePostResponse = {
  id: number;
  profileId: number;
  photos: string[];
  description: string;
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

/** Минимальный профиль для шага публикации (данные приходят снаружи фичи) */
export type PublishProfile = {
  id: number;
  username?: string;
  avatar?: string;
};
