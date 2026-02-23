import {
  ACCEPTED_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_PHOTOS_MULTIPLE,
} from '../model/constants';
import type { ProcessSelectedFilesOptions } from './processSelectedFiles';

type ValidateFileResult =
  | { valid: true }
  | { valid: false; errorKey: string; errorValues?: Record<string, string | number> };

/** В multiple: сколько ещё можно добавить. В single: всегда 1 (новый выбор заменяет текущий). */
export const getMaxAllowedInSelection = (
  multiple: boolean,
  alreadySelectedCount: number
): number => {
  if (!multiple) return 1;
  return Math.max(0, MAX_PHOTOS_MULTIPLE - alreadySelectedCount);
};

export const validateFile = (
  file: File,
  selectedNames: Set<string>,
  t: ProcessSelectedFilesOptions['t']
): ValidateFileResult => {
  if (selectedNames.has(file.name)) {
    return { valid: false, errorKey: 'errorDuplicate', errorValues: { name: file.name } };
  }
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { valid: false, errorKey: 'errorFormat', errorValues: { name: file.name } };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, errorKey: 'errorFileSize', errorValues: { name: file.name } };
  }
  return { valid: true };
};
