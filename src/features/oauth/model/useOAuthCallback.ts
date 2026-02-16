'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAxiosError } from 'axios';

import { api } from '@/shared/api/instance';
import type { ApiErrorResponse } from '@/shared/api/types';
import type { OAuthError, OAuthCallbackState } from '../types/oauth';
import { mapOAuthError } from './mapOAuthError';

export function useOAuthCallback(): OAuthCallbackState {
  const router = useRouter();
  const params = useSearchParams();

  const [error, setError] = useState<OAuthError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const code = params.get('code');
      const errorParam = params.get('error');

      if (errorParam) {
        if (isOAuthError(errorParam)) {
          setError(errorParam);
        } else {
          setError('unknown');
        }

        setLoading(false);
        return;
      }

      if (!code) {
        setError('invalid_state');
        setLoading(false);
        return;
      }

      try {
        await api.get('/api/v1/auth/me');
        router.replace('/');
      } catch (err) {
        if (isAxiosError<ApiErrorResponse>(err)) {
          setError(mapOAuthError(err));
        } else {
          setError('unknown');
        }

        setLoading(false);
      }
    };

    void checkAuth();
  }, [params, router]);

  return {
    loading,
    error,
  };
}

function isOAuthError(value: string): value is OAuthError {
  return [
    'access_denied',
    'expired',
    'invalid_state',
    'server_error',
    'unauthorized',
    'unknown',
  ].includes(value);
}
