'use client';

import { useTranslations } from 'next-intl';
import { Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import styles from './CloseModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSaveDraft: () => void;
};

export const CloseModal = ({
  isOpen,
  onClose,
  onDiscard,
  onSaveDraft,
}: Props) => {
  const t = useTranslations('CreatePost');

  const handleDiscard = () => {
    onDiscard();
    onClose();
  };

  const handleSaveDraft = () => {
    onSaveDraft();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={t('closeConfirmTitle')}
      className={styles.modalContainer}
    >
      <div className={styles.body}>
        <Typography variant="text-16" className={styles.message}>
          {t('closeConfirmMessage')}
        </Typography>
        <Typography variant="text-14" className={styles.subMessage}>
          {t('closeConfirmSubMessage')}
        </Typography>
      </div>

      <div className={styles.footer}>
        <Button
          variant="outlined"
          onClick={handleDiscard}
          className={styles.button}
          aria-label={t('closeConfirmDiscard')}
        >
          {t('closeConfirmDiscard')}
        </Button>
        <Button
          onClick={handleSaveDraft}
          className={styles.button}
          aria-label={t('closeConfirmSaveDraft')}
        >
          {t('closeConfirmSaveDraft')}
        </Button>
      </div>
    </Modal>
  );
};
