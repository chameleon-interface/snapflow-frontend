'use client';

import { ChangeEvent, useRef } from 'react';
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

const MAX_AVATAR_SIZE_BYTES = 10 * 1024 * 1024;

type UseProfileAvatarSectionParams = {
  profileId: string;
  avatarUrl: string;
};

export const useProfileAvatarSection = ({
  profileId,
  avatarUrl,
}: UseProfileAvatarSectionParams) => {
  const t = useTranslations('Settings');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    cropDraft,
    isCropModalOpen,
    openCropDraft,
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const avatar = event.target.files?.[0];

    if (profileId.length === 0) {
      event.target.value = '';
      return;
    }

    if (!avatar) {
      event.target.value = '';
      return;
    }

    if (avatar.size > MAX_AVATAR_SIZE_BYTES) {
      toastError(t('avatarTooLarge'));
      event.target.value = '';
      return;
    }

    openCropDraft(event);
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
    fileInputRef,
    isPending,
    isCropModalOpen,
    avatarToCropUrl: cropDraft?.imageSrc ?? '',
    crop: cropDraft?.crop ?? DEFAULT_CROP,
    zoom: cropDraft?.zoom ?? DEFAULT_ZOOM,
    handleButtonClick,
    handleAvatarChange,
    handleDeleteAvatar,
    handleCropModalClose,
    handleCropChange,
    handleCropComplete,
    handleCropSave,
    handleZoomChange,
  };
};
