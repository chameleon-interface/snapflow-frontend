import { useQuery } from '@tanstack/react-query';
import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/core/profile/profile';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const usePublicProfileQuery = (profileId: string) => {
  return useQuery({
    queryKey: profileKeys.userProfile(profileId),
    queryFn: () => profileControllerGetPublicProfile(profileId),
    enabled: profileId.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    meta: { globalErrorHandler: false },
  });
};
