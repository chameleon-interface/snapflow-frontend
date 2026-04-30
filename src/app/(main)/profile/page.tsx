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

    if (data?.profileId) {
      router.replace(ROUTES.PROFILE(data.profileId));

      return;
    }

    router.replace(ROUTES.SIGN_IN);
  }, [data?.profileId, isPending, router]);

  return null;
}
