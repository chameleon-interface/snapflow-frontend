'use client';

import { LogoutButton } from '@/features/auth/logout';
import { NavMenu } from '../NavMenu/NavMenu';
import { BottomNav } from '../BottomNav';
import s from './Sidebar.module.css';
import { useMe } from '@/shared/api/useMe';

export const Sidebar = () => {
  const { data, isPending, isError } = useMe();

  if (isPending || isError || !data) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`${s.sidebar} ${s.desktopOnly}`}>
        <NavMenu />
        <LogoutButton />
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className={s.mobileOnly}>
        <BottomNav />
      </div>
    </>
  );
};
