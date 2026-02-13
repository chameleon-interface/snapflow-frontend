'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import { useLogoutMutation } from '@/features/auth/logout/ui/useLogoutMutation';

export const LogoutButton = () => {
  const t = useTranslations('Auth');
  const logoutMutation = useLogoutMutation();

  return (
    <Button
      className=""
      icon={<LogOutIcon />}
      variant="text"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {t('logOut')}
    </Button>
  );
};
