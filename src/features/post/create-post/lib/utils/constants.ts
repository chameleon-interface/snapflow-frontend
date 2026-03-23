export const DEFAULT_CROP = { x: 0, y: 0 } as const;

export const DEFAULT_ZOOM = 1;
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 3;
export const ZOOM_STEP = 0.1;

export const ASPECT_RATIOS: ReadonlyArray<{ value: number | undefined }> = [
  { value: undefined },
  { value: 1 },
  { value: 4 / 5 },
  { value: 16 / 9 },
];

export const DEFAULT_ASPECT_INDEX = 0;
