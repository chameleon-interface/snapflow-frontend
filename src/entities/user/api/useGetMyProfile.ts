import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from './types';
import { api } from '@/shared/api';

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      const response = await api.get<UserProfile>('users/profile');

      return response.data;
    },
  });
};
