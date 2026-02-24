import { ConfirmModal } from '@/shared/ui/modals/ConfirmModal';
import { useMe } from '@/entities/user';
import { useTranslations } from 'next-intl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const LogoutModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const t = useTranslations();
  const { data: user } = useMe();

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={t('Modals.LogoutConfirm.title')}
      message={t('Modals.LogoutConfirm.message', {
        email: user?.email ?? '',
      })}
    />
  );
};
