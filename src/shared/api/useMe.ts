import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => api.get('/auth/me'),
    retry: false,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
  });
};
