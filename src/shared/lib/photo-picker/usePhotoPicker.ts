'use client';

import { type ChangeEvent, type RefObject, useMemo, useRef } from 'react';
import {
  processSelectedFiles,
  type ValidationError,
} from './processSelectedFiles';
import {
  ACCEPTED_TYPES,
  ACCEPT_IMAGE,
  MAX_FILE_SIZE_BYTES,
  MAX_PHOTOS_MULTIPLE,
} from './constants';
import { getPhotoNames, mergeSelectedFiles } from './utils';

type UsePhotoPickerParams = {
  photos: File[];
  onSelectPhotos: (photos: File[]) => void;
  onError: (error: string | null) => void;
  multiple?: boolean;
  disabled?: boolean;
  maxFileSizeBytes?: number;
  maxPhotosMultiple?: number;
  accept?: string;
  acceptedTypes?: string[];
  mapError: (error: ValidationError) => string;
};

type UsePhotoPickerResult = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  openFileDialog: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  multiple: boolean;
};

export const usePhotoPicker = ({
  photos,
  onSelectPhotos,
  onError,
  multiple = false,
  disabled = false,
  maxFileSizeBytes = MAX_FILE_SIZE_BYTES,
  maxPhotosMultiple = MAX_PHOTOS_MULTIPLE,
  accept = ACCEPT_IMAGE,
  acceptedTypes = ACCEPTED_TYPES,
  mapError,
}: UsePhotoPickerParams): UsePhotoPickerResult => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const alreadySelectedNames = useMemo(() => getPhotoNames(photos), [photos]);

  const openFileDialog = () => {
    if (disabled) return;
    onError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    onError(null);
    processSelectedFiles(event.target.files ?? null, {
      multiple,
      maxFileSizeBytes,
      maxPhotosMultiple,
      acceptedTypes,
      alreadySelectedCount: photos.length,
      alreadySelectedNames,
      onFilesProcessed: (files) => {
        if (!files?.length) return;
        onSelectPhotos(mergeSelectedFiles(files, photos, multiple));
      },
      onError: (error: ValidationError | null) => {
        if (!error) {
          onError(null);
          return;
        }

        onError(mapError(error));
      },
    });

    event.target.value = '';
  };

  return {
    fileInputRef,
    openFileDialog,
    handleFileChange,
    accept,
    multiple,
  };
};
