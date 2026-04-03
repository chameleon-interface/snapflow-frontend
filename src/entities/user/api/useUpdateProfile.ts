import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileControllerUpdateProfile } from '@/shared/api/generated/endpoints/profile/profile';
import type { UpdateProfileInputDto } from '@/shared/api/generated/model';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateProfileInputDto) =>
      profileControllerUpdateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.myProfile() });
    },
  });
};
