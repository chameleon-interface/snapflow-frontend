'use client';

import { useQuery } from '@tanstack/react-query';
import { profileControllerGetProfile } from '@/shared/api/generated/endpoints/profile/profile';
import type { ProfileViewDto } from '@/shared/api/generated/model';

export const myProfileQueryKey = () => ['MyProfile'] as const;

type UseGetMyProfileQueryOptions = {
  enabled?: boolean;
};

export const useGetMyProfileQuery = (options?: UseGetMyProfileQueryOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery<ProfileViewDto>({
    queryKey: myProfileQueryKey(),
    queryFn: () => profileControllerGetProfile(),
    enabled,
  });
};
