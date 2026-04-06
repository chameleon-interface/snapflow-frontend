import { useQuery } from '@tanstack/react-query';
import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/profile/profile';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const usePublicProfileQuery = (id: string) => {
  return useQuery({
    queryKey: profileKeys.userProfile(id),
    queryFn: () => profileControllerGetPublicProfile(id),
    enabled: id.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    meta: { globalErrorHandler: false },
  });
};
