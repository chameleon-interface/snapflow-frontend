'use client';

import { Sidebar } from '@/widgets';
import { useMe } from '@/features/auth/me';

export function SidebarGuard() {
  const { isAuth, loading } = useMe();

  if (loading || !isAuth) return null;
  return <Sidebar />;
}
