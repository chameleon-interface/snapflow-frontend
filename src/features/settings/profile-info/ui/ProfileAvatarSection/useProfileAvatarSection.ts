'use client';

import { ChangeEvent, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { useDeleteProfileAvatar } from '@/entities/user/api/useDeleteProfileAvatar';
import { useUploadProfileAvatar } from '@/entities/user/api/useUploadProfileAvatar';

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
  const { mutate: uploadAvatar, isPending: isUploadPending } =
    useUploadProfileAvatar(profileId);
  const { mutate: deleteAvatar, isPending: isDeletePending } =
    useDeleteProfileAvatar(profileId);
  const isPending = isUploadPending || isDeletePending;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const avatar = event.target.files?.[0];

    if (!avatar || profileId.length === 0) {
      event.target.value = '';
      return;
    }

    uploadAvatar(
      { avatar },
      {
        onSuccess: () => {
          toastSuccess(t('avatarUpdated'));
        },
        onSettled: () => {
          event.target.value = '';
        },
      },
    );
  };

  const handleDeleteAvatar = () => {
    if (!avatarUrl || profileId.length === 0) {
      return;
    }

    deleteAvatar(undefined, {
      onSuccess: () => {
        toastSuccess(t('avatarDeleted'));
      },
    });
  };

  return {
    fileInputRef,
    isPending,
    handleButtonClick,
    handleAvatarChange,
    handleDeleteAvatar,
  };
};
