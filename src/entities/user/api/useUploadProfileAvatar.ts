import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileControllerUploadAvatar } from '@/shared/api/generated/endpoints/profile/profile';
import type {
  AvatarViewDto,
  ProfileControllerUploadAvatarBody,
  PublicProfileViewDto,
  ProfileViewDto,
} from '@/shared/api/generated/model';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const useUploadProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      avatar,
    }: ProfileControllerUploadAvatarBody): Promise<AvatarViewDto> =>
      profileControllerUploadAvatar({ avatar }),
    onSuccess: ({ publicUrl }) => {
      queryClient.setQueryData<ProfileViewDto | undefined>(
        profileKeys.myProfile(),
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatarUrl: publicUrl }
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
              ? { ...currentProfile, avatarUrl: publicUrl }
              : currentProfile,
        );
      }
    },
  });
};
