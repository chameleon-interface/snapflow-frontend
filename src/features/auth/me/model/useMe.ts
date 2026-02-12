'use client';

import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/shared/api';

export function useMe() {
  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    me: query.data ?? null,
    isAuth: !!query.data,
    loading: query.isPending,
  };
}
