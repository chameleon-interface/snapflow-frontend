'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { MyProfileResponse } from './types';

export const myProfileQueryKey = () => ['my-profile'] as const;

type UseGetMyProfileQueryOptions = {
  enabled?: boolean;
};

export const useGetMyProfileQuery = (options?: UseGetMyProfileQueryOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    queryKey: myProfileQueryKey(),
    queryFn: async () => {
      const { data } = await api.get<MyProfileResponse>(`/users/profile`);
      return data;
    },
    enabled,
  });
};
