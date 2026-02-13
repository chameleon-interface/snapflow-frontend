'use client';

import { LogoutButton } from '@/features/auth/logout';
import { NavMenu } from '../NavMenu/NavMenu';
import s from './Sidebar.module.css';
import { useMe } from '@/shared/api/useMe';

export const Sidebar = () => {
  const { data, isPending, isError } = useMe();

  if (isPending || isError || !data) {
    return null;
  }

  return (
    <aside className={s.sidebar}>
      <NavMenu />
      <LogoutButton />
    </aside>
  );
};
