'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config/routes';
import { hasAuthToken } from '@/shared/lib/storage';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isPending } = useMe();
  const hasToken = hasAuthToken();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.replace(ROUTES.HOME);
    }
  }, [data, router]);

  if (data || (hasToken && isPending)) {
    return null;
  }

  return <>{children}</>;
}
