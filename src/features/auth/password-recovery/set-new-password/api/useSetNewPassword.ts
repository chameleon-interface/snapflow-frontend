import { useMutation } from '@tanstack/react-query';
import { authControllerNewPassword } from '@/shared/api/generated/endpoints/auth/auth';

type NewPasswordDTO = {
  newPassword: string;
  recoveryCode: string;
};

export const useSetNewPassword = () => {
  return useMutation({
    mutationFn: (body: NewPasswordDTO) => authControllerNewPassword(body),
  });
};
