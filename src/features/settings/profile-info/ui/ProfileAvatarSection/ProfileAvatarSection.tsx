'use client';

import { useTranslations } from 'next-intl';
import { usePhotoPicker } from '@/shared/lib';
import { HiddenFileInput } from '@/shared/ui';
import { Button, Typography } from 'snapflow-ui-kit';
import { toastError } from 'snapflow-ui-kit/client';
import {
  AVATAR_ACCEPT,
  AVATAR_ACCEPTED_TYPES,
  AVATAR_MAX_FILE_SIZE_BYTES,
} from '../../model';
import { useProfileAvatarSection } from '../../lib';
import { ProfileAvatarCropModal } from './ProfileAvatarCropModal';
import { ProfileAvatarPreview } from './ProfileAvatarPreview';
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
  const tValidation = useTranslations('Validation.selectPhotos');
  const {
    isPending,
    isCropModalOpen,
    avatarToCropUrl,
    crop,
    zoom,
    handleAvatarSelect,
    handleDeleteAvatar,
    handleCropModalClose,
    handleCropChange,
    handleCropComplete,
    handleCropSave,
    handleZoomChange,
  } = useProfileAvatarSection({
    profileId,
    avatarUrl,
  });
  const isSelectDisabled = isPending || profileId.length === 0;
  const { fileInputRef, openFileDialog, handleFileChange } = usePhotoPicker({
    photos: [],
    onSelectPhotos: handleAvatarSelect,
    onError: (error) => {
      if (error) {
        toastError(error);
      }
    },
    multiple: false,
    disabled: isSelectDisabled,
    maxFileSizeBytes: AVATAR_MAX_FILE_SIZE_BYTES,
    accept: AVATAR_ACCEPT,
    acceptedTypes: AVATAR_ACCEPTED_TYPES,
    mapError: (error) => tValidation(error.key, error.values),
  });

  return (
    <div className={s.photoColumn}>
      <ProfileAvatarPreview
        avatarUrl={avatarUrl}
        alt={t('profileAvatar')}
        deleteLabel={t('deleteAvatar')}
        isPending={isPending}
        onDelete={handleDeleteAvatar}
      />

      <HiddenFileInput
        inputRef={fileInputRef}
        accept={AVATAR_ACCEPT}
        multiple={false}
        onChange={handleFileChange}
      />

      <Button
        type="button"
        variant="outlined"
        className={s.photoButton}
        onClick={openFileDialog}
        disabled={isSelectDisabled}
      >
        <Typography
          variant={isMobile ? 'text-14-bold' : 'h3'}
          className={s.photoButtonLabel}
        >
          {label}
        </Typography>
      </Button>

      <ProfileAvatarCropModal
        open={isCropModalOpen}
        imageSrc={avatarToCropUrl}
        crop={crop}
        zoom={zoom}
        isPending={isPending}
        onCropChange={handleCropChange}
        onZoomChange={handleZoomChange}
        onCropComplete={handleCropComplete}
        onClose={handleCropModalClose}
        onSave={handleCropSave}
        title={t('avatarCropModal.title')}
        saveLabel={t('avatarCropModal.save')}
      />
    </div>
  );
};
