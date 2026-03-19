import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from './types';
import { api } from '@/shared/api';

export const useDeleteProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete<void>('users/profile/avatar');
    },
    onSuccess: () => {
      queryClient.setQueryData<UserProfile | undefined>(
        ['my-profile'],
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatarUrl: '' }
            : currentProfile,
      );
    },
  });
};
