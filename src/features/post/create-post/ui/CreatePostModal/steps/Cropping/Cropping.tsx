'use client';

import {
  addPhotosToSelection,
  getAspectOptions,
  getPhotosAfterRemove,
  useFileObjectUrls,
  ASPECT_RATIOS,
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM_STEP,
} from '@/features/post/create-post/lib';
import type { CropPosition } from '@/features/post/create-post/model/types';
import type { Area } from 'react-easy-crop';
import { Carousel } from '@/shared/ui';
import { MAX_PHOTOS_MULTIPLE } from '@/shared/ui/SelectPhotos/model/constants';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'snapflow-ui-kit';
import styles from './Cropping.module.css';
import { CropSlide } from './CropSlide';
import { CroppingToolbar } from './CroppingToolbar';

type Props = {
  selectedPhotos: File[];
  setSelectedPhotos?: (photos: File[]) => void;
  onPhotosEmpty?: () => void;
  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;
  cropAt: (index: number) => CropPosition;
  zoomAt: (index: number) => number;
  aspectAt: (index: number) => number;
  onAspectSelect: (slideIndex: number, aspectIndex: number) => void;
  onRemovePhotoAt?: (index: number) => void;
  onCropChange: (index: number, crop: CropPosition) => void;
  onZoomChange: (index: number, zoom: number) => void;
  onCropComplete: (index: number, area: Area, areaPixels: Area) => void;
};

export const Cropping = ({
  selectedPhotos,
  setSelectedPhotos,
  onPhotosEmpty,
  currentSlideIndex,
  setCurrentSlideIndex,
  cropAt,
  zoomAt,
  aspectAt,
  onAspectSelect,
  onRemovePhotoAt,
  onCropChange,
  onZoomChange,
  onCropComplete,
}: Props) => {
  const t = useTranslations('CreatePost');
  const tValidation = useTranslations('Validation.selectPhotos');
  const [error, setError] = useState<string | null>(null);
  const urls = useFileObjectUrls(selectedPhotos);
  const aspectOptions = getAspectOptions(t);

  useEffect(() => {
    queueMicrotask(() => setError(null));
  }, [selectedPhotos]);

  const currentAspectIndex = aspectAt(currentSlideIndex);

  const handleAspectSelect = useCallback(
    (index: number) => {
      onAspectSelect(currentSlideIndex, index);
    },
    [currentSlideIndex, onAspectSelect],
  );

  const handleRemovePhoto = useCallback(
    (index: number) => {
      onRemovePhotoAt?.(index);
      const next = getPhotosAfterRemove(selectedPhotos, index);
      setSelectedPhotos?.(next);
      if (next.length === 0) onPhotosEmpty?.();
    },
    [selectedPhotos, setSelectedPhotos, onPhotosEmpty, onRemovePhotoAt],
  );

  const handleAddPhotos = useCallback(
    (files: File[]) => {
      if (!setSelectedPhotos) return;
      addPhotosToSelection(files, {
        selectedPhotos,
        setSelectedPhotos,
        setError,
        t: tValidation,
      });
    },
    [selectedPhotos, setSelectedPhotos, tValidation],
  );

  if (selectedPhotos.length === 0) return null;

  return (
    <>
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className={styles.error}
        />
      )}
      <div className={styles.content}>
        <Carousel
          className={styles.carousel}
          hideArrowsWhenSingle
          value={currentSlideIndex}
          onValueChange={setCurrentSlideIndex}
        >
          {urls.map((url, index) => (
            <CropSlide
              key={url}
              imageUrl={url}
              index={index}
              crop={cropAt(index)}
              zoom={zoomAt(index)}
              aspect={ASPECT_RATIOS[aspectAt(index)].value}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
            />
          ))}
        </Carousel>

        <CroppingToolbar
          aspectOptions={aspectOptions}
          selectedAspectIndex={currentAspectIndex}
          onAspectSelect={handleAspectSelect}
          zoom={zoomAt(currentSlideIndex)}
          zoomMin={MIN_ZOOM}
          zoomMax={MAX_ZOOM}
          zoomStep={ZOOM_STEP}
          onZoomChange={(z) => onZoomChange(currentSlideIndex, z)}
          photos={selectedPhotos}
          previewUrls={urls}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={setCurrentSlideIndex}
          onRemovePhoto={handleRemovePhoto}
          onAddPhotos={handleAddPhotos}
          maxPhotos={MAX_PHOTOS_MULTIPLE}
        />
      </div>
    </>
  );
};
