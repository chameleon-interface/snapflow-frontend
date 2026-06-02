import { useQuery } from '@tanstack/react-query';
import { profileControllerGetProfile } from '@/shared/api/generated/endpoints/core/profile/profile';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

type UseGetMyProfileOptions = {
  enabled?: boolean;
};

export const useGetMyProfile = (options?: UseGetMyProfileOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    queryKey: profileKeys.myProfile(),
    queryFn: () => profileControllerGetProfile(),
    enabled,
  });
};
