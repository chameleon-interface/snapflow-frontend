import {
  ACCEPTED_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_PHOTOS_MULTIPLE,
} from './constants';

type ValidateFileResult =
  | { valid: true }
  | {
      valid: false;
      errorKey: string;
      errorValues?: Record<string, string | number>;
    };

export const getMaxAllowedInSelection = (
  multiple: boolean,
  alreadySelectedCount: number,
  maxPhotosMultiple: number = MAX_PHOTOS_MULTIPLE,
): number => {
  if (!multiple) return 1;
  return Math.max(0, maxPhotosMultiple - alreadySelectedCount);
};

export const validateFile = (
  file: File,
  selectedNames: Set<string>,
  {
    acceptedTypes = ACCEPTED_TYPES,
    maxFileSizeBytes = MAX_FILE_SIZE_BYTES,
  }: {
    acceptedTypes?: string[];
    maxFileSizeBytes?: number;
  } = {},
): ValidateFileResult => {
  if (selectedNames.has(file.name)) {
    return {
      valid: false,
      errorKey: 'errorDuplicate',
      errorValues: { name: file.name },
    };
  }

  if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      errorKey: 'errorFormat',
      errorValues: { name: file.name },
    };
  }

  if (file.size > maxFileSizeBytes) {
    return {
      valid: false,
      errorKey: 'errorFileSize',
      errorValues: { name: file.name },
    };
  }

  return { valid: true };
};
