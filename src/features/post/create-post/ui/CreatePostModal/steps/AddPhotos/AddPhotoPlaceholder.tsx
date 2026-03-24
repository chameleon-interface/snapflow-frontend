import type { KeyboardEvent } from 'react';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import styles from './AddPhotos.module.css';

type AddPhotoPlaceholderProps = {
  ariaLabel: string;
  onOpenFileDialog: () => void;
};

export const AddPhotoPlaceholder = ({
  ariaLabel,
  onOpenFileDialog,
}: AddPhotoPlaceholderProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpenFileDialog();
    }
  };

  return (
    <div
      className={styles.photoPlaceholder}
      onClick={onOpenFileDialog}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <span className={styles.iconWrap} aria-hidden>
        <ImageIcon width={36} height={36} aria-hidden />
      </span>
    </div>
  );
};
