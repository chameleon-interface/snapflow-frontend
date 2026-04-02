import {
  ACCEPTED_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_PHOTOS_MULTIPLE,
} from './constants';
import { filesToFileList } from './fileListUtils';
import { getMaxAllowedInSelection, validateFile } from './validation';

export type ValidationErrorValues = Record<string, string | number>;

export type ValidationError = {
  key: string;
  values?: ValidationErrorValues;
};

export type ProcessSelectedFilesOptions = {
  multiple: boolean;
  maxPhotosMultiple?: number;
  maxFileSizeBytes?: number;
  acceptedTypes?: string[];
  alreadySelectedCount?: number;
  alreadySelectedNames?: string[];
  onFilesProcessed: (files: FileList | null) => void;
  onError: (error: ValidationError | null) => void;
};

export const processSelectedFiles = (
  files: FileList | null,
  {
    multiple,
    maxPhotosMultiple = MAX_PHOTOS_MULTIPLE,
    maxFileSizeBytes = MAX_FILE_SIZE_BYTES,
    acceptedTypes = ACCEPTED_TYPES,
    alreadySelectedCount = 0,
    alreadySelectedNames = [],
    onFilesProcessed,
    onError,
  }: ProcessSelectedFilesOptions,
): void => {
  if (!files?.length) {
    onFilesProcessed(null);
    return;
  }

  const maxAllowed = getMaxAllowedInSelection(
    multiple,
    alreadySelectedCount,
    maxPhotosMultiple,
  );

  const totalLimit = multiple ? maxPhotosMultiple : 1;
  if (maxAllowed === 0) {
    onError({ key: 'errorLimitReached', values: { limit: totalLimit } });
    return;
  }

  if (files.length > maxAllowed) {
    onError({
      key: 'errorMaxCount',
      values: { limit: maxAllowed, count: files.length },
    });
    return;
  }

  const names = new Set<string>(alreadySelectedNames);
  const validFiles: File[] = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const result = validateFile(file, names, {
      acceptedTypes,
      maxFileSizeBytes,
    });

    if (!result.valid) {
      onError({ key: result.errorKey, values: result.errorValues });
      return;
    }

    names.add(file.name);
    validFiles.push(file);
  }

  if (validFiles.length === 0) {
    onFilesProcessed(null);
    return;
  }

  onFilesProcessed(filesToFileList(validFiles));
};
