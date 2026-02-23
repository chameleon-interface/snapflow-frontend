'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { useCreatePostMutation } from '@/features/post/create-post/api/useCreatePostMutation';
import type {
  CreatePostPayload,
  CreatePostStep,
} from '@/features/post/create-post/model/types';

type StepStateSlice = {
  step: CreatePostStep;
  setStep: (step: CreatePostStep) => void;
  currentIndex: number;
  steps: readonly CreatePostStep[];
  isFirstStep: boolean;
};

type ExportsSlice = {
  runCroppingNext: () => Promise<void>;
  runFiltersNext: () => Promise<void>;
};

type PhotosSlice = {
  setSelectedPhotos: (files: File[] | ((prev: File[]) => File[])) => void;
  setProcessedPhotos: (files: File[] | ((prev: File[]) => File[])) => void;
  filteredPhotos: File[];
};

type PublishSlice = {
  profile: { id: number } | undefined;
  description: string;
  doClose: () => void;
};

type Params = {
  stepState: StepStateSlice;
  exports: ExportsSlice;
  photos: PhotosSlice;
  publish: PublishSlice;
};

export const useHandlers = ({
  stepState,
  exports,
  photos,
  publish,
}: Params) => {
  const t = useTranslations('CreatePost');
  const { mutate: createPost, isPending: isPublishPending } =
    useCreatePostMutation();

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
      photos.setSelectedPhotos([]);
      photos.setProcessedPhotos([]);
    }
    if (nextStep === 'cropping') {
      photos.setProcessedPhotos([]);
    }
    if (nextStep != null) stepState.setStep(nextStep);
  }, [stepState, photos]);

  const handlePublish = useCallback(() => {
    if (!publish.profile?.id || photos.filteredPhotos.length === 0) return;
    const payload: CreatePostPayload = {
      profileId: publish.profile.id,
      description: publish.description,
      photoFile: photos.filteredPhotos,
    };
    createPost(payload, {
      onSuccess: () => {
        toastSuccess(t('postPublishedSuccess'));
        publish.doClose();
      },
    });
  }, [publish, photos.filteredPhotos, createPost, t]);

  return {
    handleNextStep,
    handlePreviousStep,
    handlePublish,
    isPublishPending,
  };
};
