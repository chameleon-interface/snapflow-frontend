import { MAX_PHOTOS_MULTIPLE } from '../model/constants';
import { filesToFileList } from './fileListUtils';
import { getMaxAllowedInSelection, validateFile } from './validation';

export type ValidationErrorValues = Record<string, string | number>;

export type ValidationError = {
  key: string;
  values?: ValidationErrorValues;
};

export type ProcessSelectedFilesOptions = {
  multiple: boolean;
  alreadySelectedCount?: number;
  alreadySelectedNames?: string[];
  onFilesProcessed: (files: FileList | null) => void;
  onError: (error: ValidationError | null) => void;
};

export const processSelectedFiles = (
  files: FileList | null,
  {
    multiple,
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

  const maxAllowed = getMaxAllowedInSelection(multiple, alreadySelectedCount);

  const totalLimit = multiple ? MAX_PHOTOS_MULTIPLE : 1;
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

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = validateFile(file, names);

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
