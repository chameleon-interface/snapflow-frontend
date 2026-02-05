import { Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import s from './EmailSentModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  email: string;
};

export const EmailSentModal = ({ open, onClose, email }: Props) => {
  const t = useTranslations('Modals.EmailSent');

  return (
    <Modal open={open} onClose={onClose} title={t('title')} className={s.modal}>
      <Typography variant={'text-16'}>{t('message', { email })}</Typography>
      <Button className={s.button} onClick={onClose}>
        OK
      </Button>
    </Modal>
  );
};
