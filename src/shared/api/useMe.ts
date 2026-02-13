import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';
import { hasAuthToken } from '@/shared/lib/storage';

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
    enabled: hasAuthToken(),
    retry: false,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
  });
};
