'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';

import type { Profile } from '@/features/profile/model/types';

const profileQueryKey = (id: string) => ['profile', String(id)] as const;

export const useGetProfileQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: profileQueryKey(id ?? ''),
    queryFn: async () => {
      const { data } = await api.get<Profile>(`/users/profile/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
