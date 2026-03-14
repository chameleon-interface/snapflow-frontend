'use client';

import { useCallback, useState } from 'react';
import type { PublishProfile } from '@/features/post/create-post/model/types';
import { usePhotosState } from './usePhotosState';
import { useStepState } from './useStepState';
import { useCreatePostState } from './useCreatePostState';
import { useExports } from './useExports';
import { useHandlers } from './useHandlers';
import { useCloseModal } from './useCloseModal';

type Params = {
  onClose: () => void;
  profile: PublishProfile | undefined;
};

export const useFlow = ({ onClose, profile }: Params) => {
  const photos = usePhotosState();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const postState = useCreatePostState({
    photoCount: photos.selectedPhotos.length,
  });
  const stepState = useStepState();

  const setSelectedPhotos = useCallback(
    (value: File[] | ((prev: File[]) => File[])) => {
      photos.setSelectedPhotos(value);
      const nextFiles =
        typeof value === 'function' ? value(photos.selectedPhotos) : value;
      if (nextFiles.length > 0 && stepState.step === 'addPhotos') {
        stepState.setStep('cropping');
      }
    },
    [photos, stepState],
  );

  const doClose = useCallback(() => {
    photos.setSelectedPhotos([]);
    photos.setProcessedPhotos([]);
    photos.setFilteredPhotos([]);
    setDescription('');
    setLocation('');
    stepState.setStep('addPhotos');
    postState.reset();
    onClose();
  }, [onClose, postState, photos, stepState]);

  const exports = useExports({
    selectedPhotos: photos.selectedPhotos,
    processedPhotos: photos.processedPhotos,
    postState,
    setProcessedPhotos: photos.setProcessedPhotos,
    setFilteredPhotos: photos.setFilteredPhotos,
    setStep: stepState.setStep,
  });

  const handlers = useHandlers({
    stepState,
    exports,
    photos: {
      setSelectedPhotos,
      setProcessedPhotos: photos.setProcessedPhotos,
      filteredPhotos: photos.filteredPhotos,
    },
    publish: { profile, description, doClose },
  });

  const hasUnsavedContent = photos.selectedPhotos.length > 0;
  const closeModal = useCloseModal({ hasUnsavedContent, doClose });

  const handleSaveDraftStub = useCallback(() => {
    doClose();
  }, [doClose]);

  const handleOpenDraftStub = useCallback(() => {
    // TODO: заглушка — открытие черновика
  }, []);

  return {
    step: stepState.step,
    selectedPhotos: photos.selectedPhotos,
    setSelectedPhotos,
    processedPhotos: photos.processedPhotos,
    filteredPhotos: photos.filteredPhotos,
    isCroppingExporting: exports.isCroppingExporting,
    isFiltersExporting: exports.isFiltersExporting,
    isFirstStep: stepState.isFirstStep,
    isLastStep: stepState.isLastStep,
    handleSaveDraft: handleSaveDraftStub,
    handleCloseRequest: closeModal.handleCloseRequest,
    handleDiscard: doClose,
    onOpenDraft: handleOpenDraftStub,
    isCloseModalOpened: closeModal.isCloseModalOpened,
    setIsCloseModalOpened: closeModal.setIsCloseModalOpened,
    goToAddPhotos: stepState.goToAddPhotos,
    description,
    setDescription,
    location,
    setLocation,
    profile,
    ...postState,
    ...handlers,
  };
};

export type CreatePostFlowState = ReturnType<typeof useFlow>;
