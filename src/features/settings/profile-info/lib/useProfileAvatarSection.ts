'use client';

import type { Area, Point } from 'react-easy-crop';
import { useTranslations } from 'next-intl';
import { toastError } from 'snapflow-ui-kit/client';
import { getCroppedAvatarFile } from './getCroppedAvatarFile';
import {
  DEFAULT_CROP,
  DEFAULT_ZOOM,
  useAvatarCropDraft,
} from './useAvatarCropDraft';
import { useAvatarUploadActions } from './useAvatarUploadActions';

type UseProfileAvatarSectionParams = {
  profileId: string;
  avatarUrl: string;
};

export const useProfileAvatarSection = ({
  profileId,
  avatarUrl,
}: UseProfileAvatarSectionParams) => {
  const t = useTranslations('Settings');
  const {
    cropDraft,
    isCropModalOpen,
    openCropDraftByFile,
    resetCropDraft,
    setCrop,
    setZoom,
    setCroppedAreaPixels,
  } = useAvatarCropDraft();

  const {
    isUploadPending,
    isDeletePending,
    handleDeleteAvatar,
    uploadCroppedAvatar,
  } = useAvatarUploadActions({
    avatarUrl,
    profileId,
  });
  const isPending = isUploadPending || isDeletePending;

  const handleAvatarSelect = (photos: File[]) => {
    const avatar = photos[0];

    if (profileId.length === 0 || !avatar) {
      return;
    }

    openCropDraftByFile(avatar);
  };

  const handleCropModalClose = () => {
    if (isUploadPending) {
      return;
    }

    resetCropDraft();
  };

  const handleCropChange = (nextCrop: Point) => {
    setCrop(nextCrop);
  };

  const handleZoomChange = (nextZoom: number) => {
    setZoom(nextZoom);
  };

  const handleCropComplete = (nextCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(nextCroppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!cropDraft || !cropDraft.croppedAreaPixels || profileId.length === 0) {
      return;
    }

    try {
      const croppedAvatar = await getCroppedAvatarFile({
        imageSrc: cropDraft.imageSrc,
        cropAreaPixels: cropDraft.croppedAreaPixels,
        fileName: cropDraft.fileName,
      });

      uploadCroppedAvatar(croppedAvatar, resetCropDraft);
    } catch {
      toastError(t('avatarCropFailed'));
    }
  };

  return {
    isPending,
    isCropModalOpen,
    avatarToCropUrl: cropDraft?.imageSrc ?? '',
    crop: cropDraft?.crop ?? DEFAULT_CROP,
    zoom: cropDraft?.zoom ?? DEFAULT_ZOOM,
    handleAvatarSelect,
    handleDeleteAvatar,
    handleCropModalClose,
    handleCropChange,
    handleCropComplete,
    handleCropSave,
    handleZoomChange,
  };
};
