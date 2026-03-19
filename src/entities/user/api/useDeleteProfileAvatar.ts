import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from './types';
import { api } from '@/shared/api';

export const useDeleteProfileAvatar = (profileId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete<void>('users/profile/avatar');
    },
    onSuccess: () => {
      queryClient.setQueryData<UserProfile | undefined>(
        ['profile', profileId],
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatarUrl: '' }
            : currentProfile,
      );
    },
  });
};
