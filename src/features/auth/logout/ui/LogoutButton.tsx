'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import s from './LogoutButton.module.css';

export const LogoutButton = () => {
  const t = useTranslations('Auth');
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      router.push('/sign-in'); // редирект на страницу логина
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
