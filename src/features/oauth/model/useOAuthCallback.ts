'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';

import { api } from '@/shared/api/instance';
import type { OAuthError, OAuthCallbackState } from '../types/oauth';

export function useOAuthCallback(): OAuthCallbackState {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<OAuthError | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/api/v1/auth/me');
        router.replace('/');
      } catch (err) {
        if (isAxiosError(err)) {
          const status = err.response?.status;

          if (status === 401 || status === 403) {
            setError('unauthorized');
          } else if (status === 500) {
            setError('server_error');
          } else {
            setError('unknown');
          }
        } else {
          setError('unknown');
        }

        setLoading(false);
      }
    };

    void checkAuth();
  }, [router]);

  return { loading, error };
}
