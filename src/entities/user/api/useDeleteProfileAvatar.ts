import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileControllerDeleteAvatar } from '@/shared/api/generated/endpoints/profile/profile';
import type { ProfileViewDto } from '@/shared/api/generated/model';

export const useDeleteProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileControllerDeleteAvatar(),
    onSuccess: () => {
      queryClient.setQueryData<ProfileViewDto | undefined>(
        ['my-profile'],
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatarUrl: null }
            : currentProfile,
      );
    },
  });
};
