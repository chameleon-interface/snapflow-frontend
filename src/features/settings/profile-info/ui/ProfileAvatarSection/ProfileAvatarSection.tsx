'use client';

import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { CloseIcon, ImageIcon } from 'snapflow-ui-kit/icons';
import {
  useDeleteProfileAvatar,
  useUploadProfileAvatar,
} from '@/entities/user';
import s from './ProfileAvatarSection.module.css';

type ProfileAvatarSectionProps = {
  isMobile: boolean;
  label: string;
  profileId: string;
  avatarUrl: string;
};

export const ProfileAvatarSection = ({
  isMobile,
  label,
  profileId,
  avatarUrl,
}: ProfileAvatarSectionProps) => {
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

  return (
    <div className={s.photoColumn}>
      <div className={s.avatarPlaceholder}>
        {avatarUrl ? (
          <>
            <Image
              src={avatarUrl}
              alt={t('profileAvatar')}
              className={s.avatarImage}
              fill
              sizes="192px"
            />
            <button
              type="button"
              className={s.deleteAvatarButton}
              onClick={handleDeleteAvatar}
              disabled={isPending}
              aria-label={t('deleteAvatar')}
            >
              <CloseIcon />
            </button>
          </>
        ) : (
          <ImageIcon />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleAvatarChange}
      />

      <Button
        type="button"
        variant="outlined"
        className={s.photoButton}
        onClick={handleButtonClick}
        disabled={isPending || profileId.length === 0}
      >
        <Typography
          variant={isMobile ? 'text-14-bold' : 'h3'}
          className={s.photoButtonLabel}
        >
          {label}
        </Typography>
      </Button>
    </div>
  );
};
