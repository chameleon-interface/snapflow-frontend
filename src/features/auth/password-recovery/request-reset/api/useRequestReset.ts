import { useMutation } from '@tanstack/react-query';
import { authControllerPasswordRecovery } from '@/shared/api/generated/endpoints/auth/auth';
import type { PasswordRecoveryInputDto } from '@/shared/api/generated/model';

export const useRequestReset = () => {
  return useMutation({
    mutationFn: (body: PasswordRecoveryInputDto) =>
      authControllerPasswordRecovery(body),
  });
};
