'use client';

import { useCallback, useState } from 'react';
import type {
  CreatePostStep,
  PublishProfile,
} from '@/features/post/create-post/model/types';
import { usePhotosState } from './usePhotosState';
import { useStepState } from './useStepState';
import { useCreatePostState } from './useCreatePostState';
import { useExports } from './useExports';
import { useDraft } from './useDraft';
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

  const getDraftData = useCallback(
    () => ({
      selectedPhotos: photos.selectedPhotos,
      step: stepState.step,
      postStateSnapshot: postState.getSnapshot(),
    }),
    [photos.selectedPhotos, stepState.step, postState],
  );

  const onRestore = useCallback(
    (data: {
      files: File[];
      processedPhotos: File[];
      filteredPhotos?: File[];
      finalStep: CreatePostStep;
      postState: Parameters<typeof postState.hydrate>[0];
    }) => {
      photos.setSelectedPhotos(data.files);
      postState.hydrate(data.postState);
      photos.setProcessedPhotos(data.processedPhotos);
      if (data.filteredPhotos != null) {
        photos.setFilteredPhotos(data.filteredPhotos);
      }
      stepState.setStep(data.finalStep);
    },
    [photos, postState, stepState],
  );

  const draft = useDraft({
    doClose,
    getDraftData,
    onRestore,
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

  return {
    step: stepState.step,
    selectedPhotos: photos.selectedPhotos,
    setSelectedPhotos,
    processedPhotos: photos.processedPhotos,
    filteredPhotos: photos.filteredPhotos,
    isCroppingExporting: exports.isCroppingExporting,
    isFiltersExporting: exports.isFiltersExporting,
    isDraftLoading: draft.isDraftLoading,
    draftExists: draft.draftExists,
    loadDraftAndRestore: draft.loadDraftAndRestore,
    onOpenDraft: draft.loadDraftAndRestore,
    isFirstStep: stepState.isFirstStep,
    isLastStep: stepState.isLastStep,
    handleSaveDraft: draft.handleSaveDraft,
    handleCloseRequest: closeModal.handleCloseRequest,
    handleDiscard: draft.handleDiscard,
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
