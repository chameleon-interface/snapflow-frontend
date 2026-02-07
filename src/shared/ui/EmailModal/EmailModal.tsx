import { Button, Modal, Typography } from 'snapflow-ui-kit/client';
import s from './EmailModal.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  open: boolean;
  onClose: () => void;
  email: string;
};

export const EmailModal = ({ open, onClose, email }: Props) => {
  const t = useTranslations('EmailModal');

  return (
    <Modal open={open} onClose={onClose} className={s.modal} title={t('title')}>
      <div className={s.modalContent}>
        <Typography variant="text-16">{t('message', { email })}</Typography>
        <Button className={s.modalButton} onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  );
};
