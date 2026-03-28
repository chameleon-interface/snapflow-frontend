import Image from 'next/image';
import { CloseIcon, ImageIcon } from 'snapflow-ui-kit/icons';
import s from './ProfileAvatarPreview.module.css';

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
  return (
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
          onClick={onDelete}
          disabled={isPending}
          aria-label={deleteLabel}
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
};
