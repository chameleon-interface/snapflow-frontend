'use client';

import { clsx, Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import styles from './InfoModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
};

export const InfoModal = ({
  open,
  onClose,
  title,
  message,
  buttonText = 'OK',
  onButtonClick,
  className,
}: Props) => {
  const handleButtonClick = () => {
    onClose();
    onButtonClick?.();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      className={clsx(styles.modalContainer, className)}
    >
      <div className={styles.modalBody}>
        <Typography variant="text-16">{message}</Typography>
      </div>

      <div className={styles.modalFooter}>
        <Button onClick={handleButtonClick} className={styles.button}>
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};
