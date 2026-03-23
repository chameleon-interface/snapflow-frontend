import { useQuery } from '@tanstack/react-query';
import type { GetMyProfileResponse } from './types';
import { api } from '@/shared/api';

type UseGetMyProfileOptions = {
  enabled?: boolean;
};

export const useGetMyProfile = (options?: UseGetMyProfileOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      const response = await api.get<GetMyProfileResponse>('users/profile');

      return response.data;
    },
    enabled,
  });
};
