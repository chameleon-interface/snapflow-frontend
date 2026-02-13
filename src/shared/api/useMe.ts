import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';
import { hasAuthToken } from '@/shared/lib/storage';

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => api.get('/auth/me'),
    enabled: hasAuthToken(),
    retry: false,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
  });
};
