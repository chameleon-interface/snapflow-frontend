'use client';

import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import Image from 'next/image';
import styles from '../GalleryPopover.module.css';

type Props = {
  previewUrl: string;
  isActive: boolean;
  onSelect: () => void;
  onRemove: (e: React.MouseEvent) => void;
};

export const GalleryThumbnail = ({
  previewUrl,
  isActive,
  onSelect,
  onRemove,
}: Props) => {
  const t = useTranslations('CreatePost');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={clsx(styles.thumbnailWrap, isActive && styles.thumbnailWrapActive)}
      role="button"
      tabIndex={0}
      aria-label={t('gallery')}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <Image
        src={previewUrl}
        alt=""
        className={styles.thumbnail}
        width={80}
        height={80}
        unoptimized
        draggable={false}
      />
      <button
        type="button"
        className={styles.removeBtn}
        aria-label={t('removePhoto')}
        onClick={onRemove}
      >
        ×
      </button>
    </div>
  );
};
