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
  selectedPhotos: File[];
  processedPhotos: File[];
  postState: PostStateSlice;
  setProcessedPhotos: (files: File[] | ((prev: File[]) => File[])) => void;
  setFilteredPhotos: (files: File[] | ((prev: File[]) => File[])) => void;
  setStep: (step: CreatePostStep) => void;
};

export const useExports = ({
  selectedPhotos,
  processedPhotos,
  postState,
  setProcessedPhotos,
  setFilteredPhotos,
  setStep,
}: Params) => {
  const [isCroppingExporting, setIsCroppingExporting] = useState(false);
  const [isFiltersExporting, setIsFiltersExporting] = useState(false);

  const runCroppingNext = useCallback(async () => {
    setIsCroppingExporting(true);
    try {
      const files = await runCroppingExport(
        selectedPhotos,
        postState.croppedAreasPixels,
      );
      setProcessedPhotos(files);
      setStep('filters');
    } finally {
      setIsCroppingExporting(false);
    }
  }, [
    selectedPhotos,
    postState.croppedAreasPixels,
    setProcessedPhotos,
    setStep,
  ]);

  const runFiltersNext = useCallback(async () => {
    setIsFiltersExporting(true);
    try {
      const files = await applyFiltersExport(
        processedPhotos,
        postState.filterAt,
      );
      setFilteredPhotos(files);
      setStep('publish');
    } finally {
      setIsFiltersExporting(false);
    }
  }, [processedPhotos, postState.filterAt, setFilteredPhotos, setStep]);

  return {
    runCroppingNext,
    runFiltersNext,
    isCroppingExporting,
    isFiltersExporting,
  };
};
