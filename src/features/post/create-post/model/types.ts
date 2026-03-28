import type { Area } from 'react-easy-crop';

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
