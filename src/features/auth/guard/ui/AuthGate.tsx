'use client';

import { ReactNode, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config';

type AuthGateMode = 'auth-only' | 'guest-only';

type AuthGateProps = {
  mode: AuthGateMode;
  children: ReactNode;
};

export const AuthGate = ({ mode, children }: AuthGateProps) => {
  const { data, isPending } = useMe();
  const router = useRouter();

  const redirectTo = useMemo(() => {
    if (mode === 'auth-only' && !isPending && !data) {
      return ROUTES.SIGN_IN;
    }

    if (mode === 'guest-only' && data?.profileId) {
      return ROUTES.PROFILE(data.profileId);
    }

    return null;
  }, [data, isPending, mode]);

  useEffect(() => {
    if (redirectTo) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router]);

  if (isPending) {
    return null;
  }

  if (mode === 'auth-only' && !data) {
    return null;
  }

  if (mode === 'guest-only' && data) {
    return null;
  }

  return <>{children}</>;
};
