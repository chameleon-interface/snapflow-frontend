'use client';

import { useState } from 'react';
import { Button } from 'snapflow-ui-kit';
import { Modal } from 'snapflow-ui-kit/client';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import s from './LogoutButton.module.css';

import { useLogoutMutation } from '@/features/auth/logout/api/useLogoutMutation';
import { useMe } from '@/entities/user';

export const LogoutButton = () => {
  const t = useTranslations();
  const { data: user } = useMe();
  const logoutMutation = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    logoutMutation.mutate();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        icon={<LogOutIcon />}
        variant="text"
        onClick={handleOpen}
        disabled={logoutMutation.isPending}
        className={s.button}
      >
        {t('Auth.logOut')}
      </Button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        title={t('Modals.LogoutConfirm.title')}
      >
        <p>
          {t('Modals.LogoutConfirm.message', { email: user?.email as string })}
        </p>

        <div className={s.modalButtons}>
          <Button variant="text" onClick={handleClose}>
            {t('Modals.LogoutConfirm.no')}
          </Button>
          <Button onClick={handleConfirm} disabled={logoutMutation.isPending}>
            {t('Modals.LogoutConfirm.yes')}
          </Button>
        </div>
      </Modal>
    </>
  );
};
