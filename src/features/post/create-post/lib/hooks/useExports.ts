'use client';

import { useCallback, useState } from 'react';
import type { Area } from 'react-easy-crop';
import type { CreatePostStep } from '@/features/post/create-post/model/types';
import { applyFiltersExport } from '../utils/applyFiltersExport';
import { runCroppingExport } from '../utils/runCroppingExport';

type PostStateSlice = {
  croppedAreasPixels: (Area | null)[];
  filterAt: (index: number) => string;
};

type Params = {
  originalPhotos: File[];
  croppedPhotos: File[];
  postState: PostStateSlice;
  setCroppedPhotos: (files: File[] | ((prev: File[]) => File[])) => void;
  setReadyToUploadPhotos: (files: File[] | ((prev: File[]) => File[])) => void;
  setStep: (step: CreatePostStep) => void;
};

export const useExports = ({
  originalPhotos,
  croppedPhotos,
  postState,
  setCroppedPhotos,
  setReadyToUploadPhotos,
  setStep,
}: Params) => {
  const [isCroppingExporting, setIsCroppingExporting] = useState(false);
  const [isFiltersExporting, setIsFiltersExporting] = useState(false);

  const runCroppingNext = useCallback(async () => {
    setIsCroppingExporting(true);
    try {
      const files = await runCroppingExport(
        originalPhotos,
        postState.croppedAreasPixels,
      );
      // Guard: не продвигаться дальше, если нечего показывать.
      // Это защищает от "пустых" шагов при удалении фото или фейле экспорта.
      setCroppedPhotos(files);
      if (files.length === 0) return;
      setStep('filters');
    } finally {
      setIsCroppingExporting(false);
    }
  }, [originalPhotos, postState.croppedAreasPixels, setCroppedPhotos, setStep]);

  const runFiltersNext = useCallback(async () => {
    setIsFiltersExporting(true);
    try {
      const files = await applyFiltersExport(croppedPhotos, postState.filterAt);
      // Guard: если после фильтров пусто — не переходить в publish.
      setReadyToUploadPhotos(files);
      if (files.length === 0) return;
      setStep('publish');
    } finally {
      setIsFiltersExporting(false);
    }
  }, [croppedPhotos, postState.filterAt, setReadyToUploadPhotos, setStep]);

  return {
    runCroppingNext,
    runFiltersNext,
    isCroppingExporting,
    isFiltersExporting,
  };
};
