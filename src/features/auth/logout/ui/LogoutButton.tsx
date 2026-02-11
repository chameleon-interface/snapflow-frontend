'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import s from './LogoutButton.module.css';

export const LogoutButton = () => {
  const t = useTranslations('Auth');
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post('https://snapflow.cc/api/v1/auth/logout', null, {
        withCredentials: true, // 🔴 важно для cookie
      });
    },

    onSettled: () => {
      localStorage.removeItem('accessToken');

      router.push('/log-in');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Button
      className={s.button}
      icon={<LogOutIcon />}
      variant="text"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
    >
      {t('logOut')}
    </Button>
  );
};
