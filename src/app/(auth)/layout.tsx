'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { data, isPending } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (data?.userId) {
      router.replace(ROUTES.PROFILE(data.userId));
    }
  }, [data, router]);

  if (isPending || data) {
    return null;
  }

  return <>{children}</>;
}
