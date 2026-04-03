import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileControllerDeleteAvatar } from '@/shared/api/generated/endpoints/profile/profile';
import type { ProfileViewDto } from '@/shared/api/generated/model';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const useDeleteProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileControllerDeleteAvatar(),
    onSuccess: () => {
      queryClient.setQueryData<ProfileViewDto | undefined>(
        profileKeys.myProfile(),
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatarUrl: null }
            : currentProfile,
      );
    },
  });
};
