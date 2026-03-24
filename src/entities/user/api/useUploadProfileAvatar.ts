import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileControllerUploadAvatar } from '@/shared/api/generated/endpoints/profile/profile';
import type {
  AvatarViewDto,
  ProfileControllerUploadAvatarBody,
  ProfileViewDto,
} from '@/shared/api/generated/model';

export const useUploadProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      avatar,
    }: ProfileControllerUploadAvatarBody): Promise<AvatarViewDto> =>
      profileControllerUploadAvatar({ avatar }),
    onSuccess: ({ publicUrl }) => {
      queryClient.setQueryData<ProfileViewDto | undefined>(
        ['my-profile'],
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatarUrl: publicUrl }
            : currentProfile,
      );
    },
  });
};
