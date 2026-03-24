import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';
import type { ProfileViewDto } from '@/shared/api/generated/model';

export const useDeleteProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete<void>('users/profile/avatar');
    },
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
