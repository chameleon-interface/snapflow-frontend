'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import s from './LogoutButton.module.css';

import { useLogoutMutation } from '@/features/auth/logout';
import { LogoutModal } from '@/features/auth/logout/ui/LogoutModal';

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

      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={mutate}
      />
    </>
  );
};
