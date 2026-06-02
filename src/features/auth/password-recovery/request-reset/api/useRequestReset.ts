import { useMutation } from '@tanstack/react-query';
import { authControllerPasswordRecovery } from '@/shared/api/generated/endpoints/core/auth/auth';
import type { PasswordRecoveryInputDto } from '@/shared/api/generated/model/core';

export const useRequestReset = () => {
  return useMutation({
    mutationFn: (body: PasswordRecoveryInputDto) =>
      authControllerPasswordRecovery(body),
  });
};
