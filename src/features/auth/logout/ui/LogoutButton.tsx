'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import { useTranslations } from 'next-intl';
import s from './LogoutButton.module.css';

export const LogoutButton = () => {
  const t = useTranslations('Auth');

  const handleLogout = () => {
    // TODO: add logout logic
  };

  return (
    <Button
      className={s.button}
      icon={<LogOutIcon />}
      variant={'text'}
      onClick={handleLogout}
    >
      {t('logOut')}
    </Button>
  );
};
