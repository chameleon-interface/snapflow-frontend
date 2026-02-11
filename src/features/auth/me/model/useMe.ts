'use client';

import { useQuery } from '@tanstack/react-query';
import type { Me } from './types';

const ME_URL = 'https://snapflow.cc/api/v1/auth/me';

async function fetchMe(): Promise<Me | null> {
  const res = await fetch(ME_URL, {
    credentials: 'include',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export function useMe() {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    me: query.data ?? null,
    isAuth: !!query.data,
    loading: query.isLoading,
  };
}
