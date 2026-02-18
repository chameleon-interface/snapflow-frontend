'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import s from './LogoutButton.module.css';

import { useLogoutMutation } from '../api/useLogoutMutation';
import { LogOutModal } from '../ui/LogOutModal';
import { useState } from 'react';

export const LogoutButton = () => {
  const t = useTranslations();
  const { mutate, isPending } = useLogoutMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <Button
        icon={<LogOutIcon />}
        variant="text"
        onClick={handleOpen}
        disabled={isPending}
        className={s.button}
      >
        {t('Auth.logOut')}
      </Button>

      <LogOutModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={mutate}
      />
    </>
  );
};
