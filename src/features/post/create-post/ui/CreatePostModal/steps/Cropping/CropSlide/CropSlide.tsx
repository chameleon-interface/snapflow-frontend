'use client';

import type { Area } from 'react-easy-crop';
import Cropper from 'react-easy-crop';
import type { CropPosition } from '@/features/post/create-post/model/types';
import { MIN_ZOOM, MAX_ZOOM } from '@/features/post/create-post/lib';
import styles from './CropSlide.module.css';

type Props = {
  imageUrl: string;
  index: number;
  crop: CropPosition;
  zoom: number;
  aspect: number | undefined;
  onCropChange: (index: number, crop: CropPosition) => void;
  onZoomChange: (index: number, zoom: number) => void;
  onCropComplete: (index: number, area: Area, areaPixels: Area) => void;
};

export const CropSlide = ({
  imageUrl,
  index,
  crop,
  zoom,
  aspect,
  onCropChange,
  onZoomChange,
  onCropComplete,
}: Props) => (
  <div className={styles.slideWrapper}>
    <div className={styles.cropBox}>
      <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        onCropChange={(c) => onCropChange(index, c)}
        onZoomChange={(z) => onZoomChange(index, z)}
        onCropComplete={(area, areaPixels) => onCropComplete(index, area, areaPixels)}
      />
    </div>
  </div>
);
