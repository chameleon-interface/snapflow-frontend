'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toastSuccess } from 'snapflow-ui-kit/client';
import type { CreatePostInputDto } from '@/shared/api/generated/model';
import { useUploadMediaMutation } from '@/shared/api/media/useUploadMediaMutation';
import { usePhotosState } from './usePhotosState';
import { useStepState } from './useStepState';
import { useCreatePostState } from './useCreatePostState';
import { useExports } from './useExports';
import { applyFiltersExport } from '../utils/applyFiltersExport';
import { mapDraftMediaToFiles } from '../utils/mapDraftMediaToFiles';
import { runCroppingExport } from '../utils/runCroppingExport';
import { useCreatePostMutation } from '../../api/useCreatePostMutation';
import { useCreateDraftMutation } from '../../api/useCreateDraftMutation';
import { useOpenDraftQuery } from '../../api';
import { useCloseModal } from './useCloseModal';

type Params = {
  isOpen: boolean;
  onClose: () => void;
};

export const useFlow = ({ isOpen, onClose }: Params) => {
  const t = useTranslations('CreatePost');
  const photos = usePhotosState();

  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isOpeningDraft, setIsOpeningDraft] = useState(false);
  const [isSaveDraftInProgress, setIsSaveDraftInProgress] = useState(false);
  const postState = useCreatePostState({
    photoCount: photos.originalPhotos.length,
  });
  const stepState = useStepState();

  const { mutate: createPost, isPending: isCreatePostPending } =
    useCreatePostMutation();
  const { mutateAsync: createDraft, isPending: isCreateDraftPending } =
    useCreateDraftMutation();
  const openDraftQuery = useOpenDraftQuery({
    enabled: isOpen && stepState.step === 'addPhotos',
  });
  const {
    mutateAsync: uploadMediaForPublish,
    isPending: isUploadPublishPending,
  } = useUploadMediaMutation();
  const { mutateAsync: uploadMediaForDraft, isPending: isUploadDraftPending } =
    useUploadMediaMutation();

  const canOpenDraft = openDraftQuery.data != null;
  const isDraftStatusLoading = isOpen && openDraftQuery.isPending;

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
      // не идем в filters, если нечего кропить.
      if (photos.originalPhotos.length === 0) return;
      await exports.runCroppingNext();
      return;
    }
    if (stepState.step === 'filters') {
      // не идем в publish, если нечего показывать после фильтров.
      if (photos.croppedPhotos.length === 0) return;
      await exports.runFiltersNext();
      return;
    }
    const nextStep = stepState.steps[stepState.currentIndex + 1];
    if (nextStep !== null && nextStep !== undefined)
      stepState.setStep(nextStep);
  }, [
    stepState,
    exports,
    photos.originalPhotos.length,
    photos.croppedPhotos.length,
  ]);

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
    if (nextStep !== null && nextStep !== undefined)
      stepState.setStep(nextStep);
  }, [stepState, photos]);

  const handlePublish = useCallback(
    async (profileId: string | undefined) => {
      if (!profileId || photos.readyToUploadPhotos.length === 0) return;

      const fileIds = await uploadMediaForPublish(
        photos.readyToUploadPhotos,
      ).catch(() => {
        return null;
      });

      if (fileIds === null) return;

      const payload: CreatePostInputDto = {
        description,
        fileIds,
      };

      createPost(payload, {
        onSuccess: () => {
          toastSuccess(t('postPublishedSuccess'));
          doClose();
        },
      });
    },
    [
      photos.readyToUploadPhotos,
      description,
      uploadMediaForPublish,
      createPost,
      t,
      doClose,
    ],
  );

  const hasUnsavedContent = photos.originalPhotos.length > 0;
  const closeModal = useCloseModal({ hasUnsavedContent, doClose });

  const getReadyToUploadFilesForDraft = useCallback(async () => {
    if (photos.originalPhotos.length === 0) return null;

    if (stepState.step === 'publish') {
      if (photos.readyToUploadPhotos.length === 0) return null;
      return photos.readyToUploadPhotos;
    }

    if (stepState.step === 'filters') {
      if (photos.croppedPhotos.length === 0) return null;
      const ready = await applyFiltersExport(
        photos.croppedPhotos,
        postState.filterAt,
      );
      photos.setReadyToUploadPhotos(ready);
      return ready;
    }

    if (stepState.step === 'cropping') {
      const cropped = await runCroppingExport(
        photos.originalPhotos,
        postState.croppedAreasPixels,
      );
      photos.setCroppedPhotos(cropped);
      const ready = await applyFiltersExport(cropped, postState.filterAt);
      photos.setReadyToUploadPhotos(ready);
      return ready;
    }

    return null;
  }, [
    photos,
    stepState.step,
    postState.croppedAreasPixels,
    postState.filterAt,
  ]);

  const handleSaveDraft = useCallback(async () => {
    if (isSaveDraftInProgress) return;

    setIsSaveDraftInProgress(true);
    try {
      const filesToUpload = await getReadyToUploadFilesForDraft();
      if (!filesToUpload || filesToUpload.length === 0) return;

      const fileIds = await uploadMediaForDraft(filesToUpload).catch(() => {
        return null;
      });

      if (fileIds === null) return;

      const payload: CreatePostInputDto = {
        description,
        fileIds,
      };

      await createDraft(payload, {
        onSuccess: () => {
          toastSuccess(t('draftSaveSuccess'));
          doClose();
        },
      });
    } finally {
      setIsSaveDraftInProgress(false);
    }
  }, [
    description,
    getReadyToUploadFilesForDraft,
    uploadMediaForDraft,
    createDraft,
    t,
    doClose,
    isSaveDraftInProgress,
  ]);

  const handleOpenDraft = useCallback(() => {
    if (isOpeningDraft) return;

    const openDraft = async () => {
      setIsOpeningDraft(true);
      try {
        const { data: freshDraft } = await openDraftQuery.refetch();
        const draft = freshDraft ?? openDraftQuery.data ?? null;
        if (!draft) return;

        const draftFiles = await mapDraftMediaToFiles(draft.postMedias);
        photos.setOriginalPhotos(draftFiles);
        photos.setCroppedPhotos([]);
        photos.setReadyToUploadPhotos([]);
        postState.reset();
        const draftDescription =
          typeof draft.description === 'string' ? draft.description : '';
        setDescription(draftDescription);
        stepState.setStep('cropping');
      } finally {
        setIsOpeningDraft(false);
      }
    };

    void openDraft();
  }, [isOpeningDraft, openDraftQuery, photos, postState, stepState]);

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
    handleSaveDraft,
    handleCloseRequest: closeModal.handleCloseRequest,
    handleDiscard: doClose,
    onOpenDraft: handleOpenDraft,
    canOpenDraft,
    isDraftStatusLoading: isDraftStatusLoading || isOpeningDraft,
    isCloseModalOpened: closeModal.isCloseModalOpened,
    setIsCloseModalOpened: closeModal.setIsCloseModalOpened,
    goToAddPhotos: stepState.goToAddPhotos,
    description,
    setDescription,
    location,
    setLocation,
    ...postState,
    handleNextStep,
    handlePreviousStep,
    handlePublish,
    isPublishMutationPending: isUploadPublishPending || isCreatePostPending,
    isSaveDraftPending:
      isSaveDraftInProgress || isUploadDraftPending || isCreateDraftPending,
  };
};

export type CreatePostFlowState = ReturnType<typeof useFlow>;
