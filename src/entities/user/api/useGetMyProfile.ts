import { useQuery } from '@tanstack/react-query';
import { profileControllerGetProfile } from '@/shared/api/generated/endpoints/profile/profile';

type UseGetMyProfileOptions = {
  enabled?: boolean;
};

export const useGetMyProfile = (options?: UseGetMyProfileOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    queryKey: ['my-profile'],
    queryFn: () => profileControllerGetProfile(),
    enabled,
  });
};
