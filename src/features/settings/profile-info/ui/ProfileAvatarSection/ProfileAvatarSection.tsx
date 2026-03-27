'use client';

import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
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
  const {
    fileInputRef,
    isPending,
    isCropModalOpen,
    avatarToCropUrl,
    crop,
    zoom,
    handleButtonClick,
    handleAvatarChange,
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

  return (
    <div className={s.photoColumn}>
      <ProfileAvatarPreview
        avatarUrl={avatarUrl}
        alt={t('profileAvatar')}
        deleteLabel={t('deleteAvatar')}
        isPending={isPending}
        onDelete={handleDeleteAvatar}
      />

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
