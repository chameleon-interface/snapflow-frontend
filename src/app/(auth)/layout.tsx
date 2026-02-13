'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/shared/api/useMe';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.replace('/');
    }
  }, [data, router]);

  if (data) {
    return null;
  }

  return <>{children}</>;
}
