'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toastError, toastSuccess } from 'snapflow-ui-kit/client';
import type {
  CreatePostPayload,
  PublishProfile,
} from '@/features/post/create-post/model/types';
import { useUploadMediaMutation } from '@/shared/api/media/useUploadMediaMutation';
import { usePhotosState } from './usePhotosState';
import { useStepState } from './useStepState';
import { useCreatePostState } from './useCreatePostState';
import { useExports } from './useExports';
import { useCreatePostMutation } from '../../api/useCreatePostMutation';
import { useCloseModal } from './useCloseModal';

type Params = {
  onClose: () => void;
  profile: PublishProfile | undefined;
};

export const useFlow = ({ onClose, profile }: Params) => {
  const t = useTranslations('CreatePost');
  const photos = usePhotosState();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const postState = useCreatePostState({
    photoCount: photos.originalPhotos.length,
  });
  const stepState = useStepState();

  const { mutate: createPost, isPending: isCreatePostPending } =
    useCreatePostMutation();
  const { mutateAsync: uploadMedia, isPending: isUploadPending } =
    useUploadMediaMutation();

  const setOriginalPhotos = useCallback(
    (value: File[] | ((prev: File[]) => File[])) => {
      photos.setOriginalPhotos(value);
      const nextFiles =
        typeof value === 'function' ? value(photos.originalPhotos) : value;
      if (nextFiles.length > 0 && stepState.step === 'addPhotos') {
        stepState.setStep('cropping');
      }
    },
    [photos, stepState],
  );

  const doClose = useCallback(() => {
    photos.setOriginalPhotos([]);
    photos.setCroppedPhotos([]);
    photos.setReadyToUploadPhotos([]);
    setDescription('');
    setLocation('');
    stepState.setStep('addPhotos');
    postState.reset();
    onClose();
  }, [onClose, postState, photos, stepState]);

  const exports = useExports({
    originalPhotos: photos.originalPhotos,
    croppedPhotos: photos.croppedPhotos,
    postState,
    setCroppedPhotos: photos.setCroppedPhotos,
    setReadyToUploadPhotos: photos.setReadyToUploadPhotos,
    setStep: stepState.setStep,
  });

  const handleNextStep = useCallback(async () => {
    if (stepState.step === 'cropping') {
      await exports.runCroppingNext();
      return;
    }
    if (stepState.step === 'filters') {
      await exports.runFiltersNext();
      return;
    }
    const nextStep = stepState.steps[stepState.currentIndex + 1];
    if (nextStep != null) stepState.setStep(nextStep);
  }, [stepState, exports]);

  const handlePreviousStep = useCallback(() => {
    if (stepState.isFirstStep) return;
    const nextStep = stepState.steps[stepState.currentIndex - 1];
    if (nextStep === 'addPhotos') {
      photos.setOriginalPhotos([]);
      photos.setCroppedPhotos([]);
    }
    if (nextStep === 'cropping') {
      photos.setCroppedPhotos([]);
    }
    if (nextStep != null) stepState.setStep(nextStep);
  }, [stepState, photos]);

  const handlePublish = useCallback(async () => {
    if (!profile?.id || photos.readyToUploadPhotos.length === 0) return;

    try {
      const fileIds = await uploadMedia(photos.readyToUploadPhotos);
      const payload: CreatePostPayload = {
        description,
        fileIds,
      };

      createPost(payload, {
        onSuccess: () => {
          toastSuccess(t('postPublishedSuccess'));
          doClose();
        },
        onError: () => {
          toastError(t('postPublishError'));
        },
      });
    } catch {
      toastError(t('postPublishError'));
    }
  }, [
    profile?.id,
    photos.readyToUploadPhotos,
    description,
    uploadMedia,
    createPost,
    t,
    doClose,
  ]);

  const hasUnsavedContent = photos.originalPhotos.length > 0;
  const closeModal = useCloseModal({ hasUnsavedContent, doClose });

  const handleSaveDraftStub = useCallback(() => {
    doClose();
  }, [doClose]);

  const handleOpenDraftStub = useCallback(() => {
    // TODO: заглушка — открытие черновика
  }, []);

  return {
    step: stepState.step,
    originalPhotos: photos.originalPhotos,
    setOriginalPhotos,
    croppedPhotos: photos.croppedPhotos,
    readyToUploadPhotos: photos.readyToUploadPhotos,
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
    handleNextStep,
    handlePreviousStep,
    handlePublish,
    isPublishPending: isUploadPending || isCreatePostPending,
  };
};

export type CreatePostFlowState = ReturnType<typeof useFlow>;
