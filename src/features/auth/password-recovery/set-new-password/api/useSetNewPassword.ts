import { useMutation } from '@tanstack/react-query';
import { authControllerNewPassword } from '@/shared/api/generated/endpoints/core/auth/auth';
import type { NewPasswordInputDto } from '@/shared/api/generated/model/core';

export const useSetNewPassword = () => {
  return useMutation({
    mutationFn: (body: NewPasswordInputDto) => authControllerNewPassword(body),
  });
};
