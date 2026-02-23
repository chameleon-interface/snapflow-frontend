import { MAX_PHOTOS_MULTIPLE } from '../model/constants';
import { filesToFileList } from './fileListUtils';
import { getMaxAllowedInSelection, validateFile } from './validation';

export type ProcessSelectedFilesOptions = {
  multiple: boolean;
  alreadySelectedCount?: number;
  alreadySelectedNames?: string[];
  onFilesProcessed: (files: FileList | null) => void;
  onError: (message: string) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export const processSelectedFiles = (
  files: FileList | null,
  {
    multiple,
    alreadySelectedCount = 0,
    alreadySelectedNames = [],
    onFilesProcessed,
    onError,
    t,
  }: ProcessSelectedFilesOptions,
): void => {
  if (!files?.length) {
    onFilesProcessed(null);
    return;
  }

  const maxAllowed = getMaxAllowedInSelection(multiple, alreadySelectedCount);

  const totalLimit = multiple ? MAX_PHOTOS_MULTIPLE : 1;
  if (maxAllowed === 0) {
    onError(t('errorLimitReached', { limit: totalLimit }));
    return;
  }

  if (files.length > maxAllowed) {
    onError(t('errorMaxCount', { limit: maxAllowed, count: files.length }));
    return;
  }

  const names = new Set<string>(alreadySelectedNames);
  const validFiles: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = validateFile(file, names, t);

    if (!result.valid) {
      onError(
        result.errorValues
          ? t(result.errorKey, result.errorValues)
          : t(result.errorKey),
      );
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
