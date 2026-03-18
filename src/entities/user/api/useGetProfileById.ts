import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from './types';
import { api } from '@/shared/api';

export const useGetProfileById = (profileId: string) => {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      const response = await api.get<UserProfile>(`users/profile/${profileId}`);

      return response.data;
    },
  });
};
