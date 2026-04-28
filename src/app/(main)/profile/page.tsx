'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config';

export default function ProfileRedirectPage() {
  const router = useRouter();
  const { data, isPending } = useMe();

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (data?.userId) {
      router.replace(ROUTES.PROFILE(data.userId));

      return;
    }

    router.replace(ROUTES.SIGN_IN);
  }, [data?.userId, isPending, router]);

  return null;
}
