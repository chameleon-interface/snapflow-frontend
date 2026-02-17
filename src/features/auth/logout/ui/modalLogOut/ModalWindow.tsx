import { Modal } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import s from './modalLogOut.module.css';

export const ModalWindow = ({
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
        <p>
          {t('Modals.LogoutConfirm.message', { email: user?.email as string })}
        </p>
      </div>

      <div className={s.modalFooter}>
        <Button variant="text" onClick={onClose} className={s.buttonModal}>
          {t('Modals.LogoutConfirm.no')}
        </Button>
        <Button onClick={onConfirm} disabled={false} className={s.buttonModal}>
          {t('Modals.LogoutConfirm.yes')}
        </Button>
      </div>
    </Modal>
  );
};
