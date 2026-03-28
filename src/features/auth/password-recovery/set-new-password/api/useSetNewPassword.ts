import { useMutation } from '@tanstack/react-query';
import { authControllerNewPassword } from '@/shared/api/generated/endpoints/auth/auth';
import type { NewPasswordInputDto } from '@/shared/api/generated/model';

export const useSetNewPassword = () => {
  return useMutation({
    mutationFn: (body: NewPasswordInputDto) => authControllerNewPassword(body),
  });
};
