import { AspectRatioSelector } from './AspectRatioSelector';
import styles from './CroppingToolbar.module.css';
import { GallerySelector } from './GallerySelector';
import { ZoomSelector } from './ZoomSelector';

type AspectOption = { label: string };

type Props = {
  aspectOptions: AspectOption[];
  selectedAspectIndex: number;
  onAspectSelect: (index: number) => void;
  zoom: number;
  zoomMin: number;
  zoomMax: number;
  zoomStep: number;
  onZoomChange: (value: number) => void;
  photos: File[];
  previewUrls: string[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onRemovePhoto: (index: number) => void;
  onAddPhotos: (files: File[]) => void;
  maxPhotos?: number;
};

export const CroppingToolbar = ({
  aspectOptions,
  selectedAspectIndex,
  onAspectSelect,
  zoom,
  zoomMin,
  zoomMax,
  zoomStep,
  onZoomChange,
  photos,
  previewUrls,
  currentSlideIndex,
  onSelectSlide,
  onRemovePhoto,
  onAddPhotos,
  maxPhotos = 10,
}: Props) => (
  <div className={styles.toolbar}>
    <div className={styles.toolbarControls}>
      <div className={styles.toolbarControlsLeft}>
        <AspectRatioSelector
          options={aspectOptions}
          selectedIndex={selectedAspectIndex}
          onSelect={onAspectSelect}
        />
        <ZoomSelector
          value={zoom}
          min={zoomMin}
          max={zoomMax}
          step={zoomStep}
          onChange={onZoomChange}
        />
      </div>
      <GallerySelector
        photos={photos}
        previewUrls={previewUrls}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={onSelectSlide}
        onRemove={onRemovePhoto}
        onAdd={onAddPhotos}
        maxPhotos={maxPhotos}
      />
    </div>
  </div>
);
