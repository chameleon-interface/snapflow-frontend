'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { data, isPending } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.replace(ROUTES.HOME);
    }
  }, [data, router]);

  if (isPending || data) {
    return null;
  }

  return <>{children}</>;
}
