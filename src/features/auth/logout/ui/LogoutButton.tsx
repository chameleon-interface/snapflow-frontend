'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import s from './LogoutButton.module.css';

import { useLogoutMutation } from '@/features/auth/logout/api/useLogoutMutation';
import { ModalWindow } from '@/features/auth/logout/ui/modalLogOut/ModalWindow';
import { useState } from 'react';

export const LogoutButton = () => {
  const t = useTranslations();
  const logoutMutation = useLogoutMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

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

      <ModalWindow
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={logoutMutation.mutate}
      />
    </>
  );
};
