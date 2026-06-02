import type { Area, Point } from 'react-easy-crop';
import Cropper from 'react-easy-crop';
import { Button, Modal } from 'snapflow-ui-kit/client';
import s from './ProfileAvatarCropModal.module.css';

type ProfileAvatarCropModalProps = {
  open: boolean;
  imageSrc: string;
  crop: Point;
  zoom: number;
  isPending: boolean;
  onCropChange: (crop: Point) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedAreaPixels: Area) => void;
  onClose: () => void;
  onSave: () => void;
  title: string;
  saveLabel: string;
};

export const ProfileAvatarCropModal = ({
  open,
  imageSrc,
  crop,
  zoom,
  isPending,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onClose,
  onSave,
  title,
  saveLabel,
}: ProfileAvatarCropModalProps) => {
  return (
    <Modal open={open} onClose={onClose} className={s.modal} title={title}>
      <div className={s.content}>
        <div className={s.cropperViewport}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            minZoom={1}
            maxZoom={3}
            zoomWithScroll
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={(_, croppedAreaPixels) =>
              onCropComplete(croppedAreaPixels)
            }
          />
        </div>

        <div className={s.actions}>
          <Button
            type="button"
            className={s.actionButton}
            onClick={onSave}
            disabled={isPending || !imageSrc}
          >
            {saveLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
