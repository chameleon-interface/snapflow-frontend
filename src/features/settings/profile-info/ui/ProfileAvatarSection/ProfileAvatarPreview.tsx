import Image from 'next/image';
import { CloseIcon, ImageIcon } from 'snapflow-ui-kit/icons';
import s from './ProfileAvatarPreview.module.css';
import { ConfirmModal } from '@/shared/ui';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type ProfileAvatarPreviewProps = {
  avatarUrl: string;
  alt: string;
  deleteLabel: string;
  isPending: boolean;
  onDelete: () => void;
};

export const ProfileAvatarPreview = ({
  avatarUrl,
  alt,
  deleteLabel,
  isPending,
  onDelete,
}: ProfileAvatarPreviewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('Settings');

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onDelete}
        title={t('deleteAvatar')}
        message={t('deleteAvatarConfirmation')}
      />
      <div className={s.avatarPreview}>
        <div className={s.avatarPlaceholder}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={alt}
              className={s.avatarImage}
              fill
              sizes="192px"
            />
          ) : (
            <ImageIcon />
          )}
        </div>

        {avatarUrl ? (
          <button
            type="button"
            className={s.deleteAvatarButton}
            onClick={() => setIsModalOpen(true)}
            disabled={isPending}
            aria-label={deleteLabel}
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </>
  );
};
