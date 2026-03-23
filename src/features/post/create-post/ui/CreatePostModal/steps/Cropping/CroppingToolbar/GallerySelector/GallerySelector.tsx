'use client';

import { usePopover } from '@/features/post/create-post/lib';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import { GalleryPopover } from './GalleryPopover';
import styles from './GallerySelector.module.css';

type Props = {
  photos: File[];
  previewUrls: string[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onRemove: (index: number) => void;
  onAdd: (files: File[]) => void;
  maxPhotos?: number;
};

export const GallerySelector = ({
  photos,
  previewUrls,
  currentSlideIndex,
  onSelectSlide,
  onRemove,
  onAdd,
  maxPhotos = 10,
}: Props) => {
  const t = useTranslations('CreatePost');
  const { isOpen, toggle, wrapperRef, triggerRef } = usePopover();

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className={clsx(styles.trigger, isOpen && styles.triggerActive)}
        aria-label={t('gallery')}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={toggle}
      >
        <ImageIcon aria-hidden />
      </button>
      {isOpen && (
        <GalleryPopover
          photos={photos}
          previewUrls={previewUrls}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={onSelectSlide}
          onRemove={onRemove}
          onAdd={onAdd}
          maxPhotos={maxPhotos}
        />
      )}
    </div>
  );
};
