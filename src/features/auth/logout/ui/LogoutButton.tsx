'use client';

import { useState } from 'react';
import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import s from './LogoutButton.module.css';

import { useLogoutMutation } from '@/features/auth/logout';
import { LogOutModal } from '../ui/LogOutModal';

export const LogoutButton = () => {
  const t = useTranslations();
  const { mutate, isPending } = useLogoutMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        icon={<LogOutIcon />}
        variant="text"
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
        className={s.button}
      >
        {t('Auth.logOut')}
      </Button>

      <LogOutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={mutate}
      />
    </>
  );
};
