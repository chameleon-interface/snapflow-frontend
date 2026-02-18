import { Modal } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import s from './LogOutModal.module.css';

export const LogOutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const t = useTranslations();
  const { data: user } = useMe();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={t('Modals.LogoutConfirm.title')}
      className={s.modalContainer}
    >
      <div className={s.modalBody}>
        <Typography variant={'text-16'}>
          {t('Modals.LogoutConfirm.message', { email: user?.email as string })}
        </Typography>
      </div>

      <div className={s.modalFooter}>
        <Button
          variant="outlined"
          onClick={onConfirm}
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
