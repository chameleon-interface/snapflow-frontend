import { Modal } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import s from './LogOutModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const LogOutModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const t = useTranslations();
  const { data: user } = useMe();

  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={t('Modals.LogoutConfirm.title')}
      className={s.modalContainer}
    >
      <div className={s.modalBody}>
        <Typography variant="text-16">
          {t('Modals.LogoutConfirm.message', {
            email: user?.email ?? '',
          })}
        </Typography>
      </div>

      <div className={s.modalFooter}>
        <Button
          variant="outlined"
          onClick={handleConfirm}
          className={s.buttonModal}
        >
          {t('Modals.LogoutConfirm.yes')}
        </Button>

        <Button onClick={onClose} className={s.buttonModal}>
          {t('Modals.LogoutConfirm.no')}
        </Button>
      </div>
    </Modal>
  );
};
