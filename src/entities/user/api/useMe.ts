import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';

type MeResponse = {
  userId: string;
  email: string;
  username: string;
};

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await api.get<MeResponse>('/auth/me');
      return response.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
    retryOnMount: false,
  });
};
