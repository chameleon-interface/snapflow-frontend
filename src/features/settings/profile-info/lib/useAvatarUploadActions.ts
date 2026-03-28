'use client';

import { useTranslations } from 'next-intl';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { useDeleteProfileAvatar } from '@/entities/user/api/useDeleteProfileAvatar';
import { useUploadProfileAvatar } from '@/entities/user/api/useUploadProfileAvatar';

type UseAvatarUploadActionsParams = {
  avatarUrl: string;
  profileId: string;
};

export const useAvatarUploadActions = ({
  avatarUrl,
  profileId,
}: UseAvatarUploadActionsParams) => {
  const t = useTranslations('Settings');
  const { mutate: uploadAvatar, isPending: isUploadPending } =
    useUploadProfileAvatar();
  const { mutate: deleteAvatar, isPending: isDeletePending } =
    useDeleteProfileAvatar();

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

  const uploadCroppedAvatar = (avatar: File, onSuccess?: () => void) => {
    uploadAvatar(
      { avatar },
      {
        onSuccess: () => {
          toastSuccess(t('avatarUpdated'));
          onSuccess?.();
        },
      },
    );
  };

  return {
    isUploadPending,
    isDeletePending,
    handleDeleteAvatar,
    uploadCroppedAvatar,
  };
};
