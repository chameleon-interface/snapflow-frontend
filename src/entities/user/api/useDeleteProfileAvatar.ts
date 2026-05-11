import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileControllerDeleteAvatar } from '@/shared/api/generated/endpoints/core/profile/profile';
import type {
  ProfileViewDto,
  PublicProfileViewDto,
} from '@/shared/api/generated/model/core';
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

      const profile = queryClient.getQueryData<ProfileViewDto>(
        profileKeys.myProfile(),
      );

      if (profile?.id) {
        queryClient.setQueryData<PublicProfileViewDto | undefined>(
          profileKeys.userProfile(profile.id),
          (currentProfile) =>
            currentProfile
              ? { ...currentProfile, avatarUrl: null }
              : currentProfile,
        );
      }
    },
  });
};
