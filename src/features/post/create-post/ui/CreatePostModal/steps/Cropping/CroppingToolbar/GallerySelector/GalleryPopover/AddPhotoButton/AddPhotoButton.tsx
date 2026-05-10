import { useRef } from 'react';
import styles from '../GalleryPopover.module.css';

type Props = {
  onAdd: (files: File[]) => void;
  accept?: string;
  ariaLabel: string;
  visible: boolean;
};

export const AddPhotoButton = ({
  onAdd,
  accept = '.jpeg,.jpg,.png',
  ariaLabel,
  visible,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    onAdd(Array.from(files));
    e.target.value = '';
  };

  if (!visible) return null;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        aria-hidden
        tabIndex={-1}
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      <button
        type="button"
        className={styles.addBtn}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        +
      </button>
    </>
  );
};
