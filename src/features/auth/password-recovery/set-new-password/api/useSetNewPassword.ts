import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

type NewPasswordDTO = {
  newPassword: string;
  recoveryCode: string;
};

export const useSetNewPassword = () => {
  return useMutation({
    mutationFn: (body: NewPasswordDTO) =>
      api.post<void>('/auth/new-password', body),
  });
};
