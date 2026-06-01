import { useTranslations } from 'next-intl';
import { Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import styles from './CloseModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSaveDraft: () => void | Promise<void>;
  isSavingDraft?: boolean;
};

export const CloseModal = ({
  isOpen,
  onClose,
  onDiscard,
  onSaveDraft,
  isSavingDraft = false,
}: Props) => {
  const t = useTranslations('CreatePost');

  const handleDiscard = () => {
    onDiscard();
    onClose();
  };

  const handleSaveDraft = async () => {
    await Promise.resolve(onSaveDraft());
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={t('closeModalTitle')}
      className={styles.modalContainer}
    >
      <div className={styles.body}>
        <Typography variant="text-16" className={styles.message}>
          {t('closeModalMessage')}
        </Typography>
        <Typography variant="text-14" className={styles.subMessage}>
          {t('closeModalSubMessage')}
        </Typography>
      </div>

      <div className={styles.footer}>
        <Button
          variant="outlined"
          onClick={handleDiscard}
          className={styles.button}
          aria-label={t('closeModalDiscard')}
          disabled={isSavingDraft}
        >
          {t('closeModalDiscard')}
        </Button>
        <Button
          onClick={handleSaveDraft}
          className={styles.button}
          aria-label={t('closeModalSaveDraft')}
          disabled={isSavingDraft}
        >
          {isSavingDraft ? t('savingDraft') : t('closeModalSaveDraft')}
        </Button>
      </div>
    </Modal>
  );
};
