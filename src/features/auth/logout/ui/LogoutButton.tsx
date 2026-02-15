'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import { useLogoutMutation } from '@/features/auth/logout/api/useLogoutMutation';
import s from './LogoutButton.module.css';

export const LogoutButton = () => {
  const t = useTranslations('Auth');
  const logoutMutation = useLogoutMutation();

  return (
    <Button
      className={s.button}
      icon={<LogOutIcon />}
      variant="text"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {t('logOut')}
    </Button>
  );
};
