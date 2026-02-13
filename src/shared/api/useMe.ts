import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';

export const useMe = () => {
  const hasToken =
    typeof window !== 'undefined'
      ? !!localStorage.getItem('accessToken')
      : false;

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => api.get('/auth/me'),
    enabled: hasToken,
    retry: false,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
  });
};
