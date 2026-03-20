'use client';

import { ChangeEvent, useRef } from 'react';
import type { Area, Point } from 'react-easy-crop';
import { getCroppedAvatarFile } from '../lib/getCroppedAvatarFile';
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
    if (profileId.length === 0) {
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

    const croppedAvatar = await getCroppedAvatarFile({
      imageSrc: cropDraft.imageSrc,
      cropAreaPixels: cropDraft.croppedAreaPixels,
      fileName: cropDraft.fileName,
    });

    uploadCroppedAvatar(croppedAvatar, resetCropDraft);
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
