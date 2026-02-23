'use client';

import { useTranslations } from 'next-intl';
import { AddPhotoButton } from './AddPhotoButton';
import { GalleryThumbnail } from './GalleryThumbnail';
import styles from './GalleryPopover.module.css';

type Props = {
  photos: File[];
  previewUrls: string[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onRemove: (index: number) => void;
  onAdd: (files: File[]) => void;
  accept?: string;
  maxPhotos?: number;
};

export const GalleryPopover = ({
  photos,
  previewUrls,
  currentSlideIndex,
  onSelectSlide,
  onRemove,
  onAdd,
  accept = '.jpeg,.jpg,.png',
  maxPhotos = 10,
}: Props) => {
  const t = useTranslations('CreatePost');

  const handleRemoveClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onRemove(index);
  };

  const canAdd = photos.length < maxPhotos;

  return (
    <div className={styles.popover} role="dialog" aria-label={t('gallery')}>
      <div className={styles.thumbnailsScroll}>
        <div className={styles.thumbnails}>
          {previewUrls.map((url, index) => (
            <GalleryThumbnail
              key={url}
              previewUrl={url}
              isActive={index === currentSlideIndex}
              onSelect={() => onSelectSlide(index)}
              onRemove={(e) => handleRemoveClick(e, index)}
            />
          ))}
        </div>
      </div>
      <AddPhotoButton
        onAdd={onAdd}
        accept={accept}
        ariaLabel={t('addPhoto')}
        visible={canAdd}
      />
    </div>
  );
};
