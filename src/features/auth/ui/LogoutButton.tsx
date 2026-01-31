'use client';

import { Button } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import s from './LogoutButton.module.css';

export const LogoutButton = () => {
  const handleLogout = () => {
    // TODO: логика выхода
  };

  return (
    <Button
      className={s.button}
      icon={<LogOutIcon />}
      variant={'text'}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
};
