'use client';

import { useQuery } from '@tanstack/react-query';
import { profileControllerGetProfile } from '@/shared/api/generated/endpoints/profile/profile';
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
      const profile = await profileControllerGetProfile();

      return {
        ...profile,
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        dateOfBirth: profile.dateOfBirth ?? '',
        country: profile.country ?? '',
        city: profile.city ?? '',
        avatarUrl: profile.avatarUrl ?? '',
        aboutMe: profile.aboutMe ?? '',
      } satisfies MyProfileResponse;
    },
    enabled,
  });
};
