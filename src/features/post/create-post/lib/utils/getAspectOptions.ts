export type AspectLabelKey = 'aspectOriginal' | '1:1' | '4:5' | '16:9';

const ASPECT_LABEL_KEYS: readonly AspectLabelKey[] = [
  'aspectOriginal',
  '1:1',
  '4:5',
  '16:9',
];

export const getAspectOptions = (): readonly AspectLabelKey[] =>
  ASPECT_LABEL_KEYS;
