'use client';

import { useTranslations } from 'next-intl';
import { clsx, Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import styles from './ConfirmModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  className,
}: Props) => {
  const t = useTranslations('Modals.Confirm');
  const confirmText = confirmLabel ?? t('yes');
  const cancelText = cancelLabel ?? t('no');

  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      className={clsx(styles.modalContainer, className)}
    >
      <div className={styles.modalBody}>
        <Typography variant="text-16">{message}</Typography>
      </div>

      <div className={styles.modalFooter}>
        <Button
          variant="outlined"
          onClick={handleConfirm}
          className={styles.buttonModal}
        >
          {confirmText}
        </Button>

        <Button onClick={onClose} className={styles.buttonModal}>
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
};
