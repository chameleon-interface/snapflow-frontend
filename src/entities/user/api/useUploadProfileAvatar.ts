import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  GetMyProfileResponse,
  UploadProfileAvatarDto,
  UploadProfileAvatarResponse,
} from './types';
import { api } from '@/shared/api';

export const useUploadProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ avatar }: UploadProfileAvatarDto) => {
      const formData = new FormData();

      formData.append('avatar', avatar);

      const response = await api.post<UploadProfileAvatarResponse>(
        'users/profile/avatar',
        formData,
      );

      return response.data;
    },
    onSuccess: ({ publicUrl }) => {
      queryClient.setQueryData<GetMyProfileResponse | undefined>(
        ['my-profile'],
        (currentProfile) =>
          currentProfile
            ? { ...currentProfile, avatarUrl: publicUrl }
            : currentProfile,
      );
    },
  });
};
