type TranslateFn = (key: string) => string;

const ASPECT_LABELS: readonly string[] = ['aspectOriginal', '1:1', '4:5', '16:9'];

export const getAspectOptions = (t: TranslateFn) =>
  ASPECT_LABELS.map((key) => ({
    label: key === 'aspectOriginal' ? t(key) : key,
  }));
