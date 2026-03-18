import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  UploadProfileAvatarDto,
  UploadProfileAvatarResponse,
  UserProfile,
} from './types';
import { api } from '@/shared/api';

export const useUploadProfileAvatar = (profileId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ avatar }: UploadProfileAvatarDto) => {
      const formData = new FormData();

      formData.append('avatar', avatar);

      const response = await api.post<UploadProfileAvatarResponse>(
        'users/profile/avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    },
    onSuccess: ({ publicUrl }) => {
      queryClient.setQueryData<UserProfile | undefined>(
        ['profile', profileId],
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatar: publicUrl }
            : currentProfile,
      );
    },
  });
};
