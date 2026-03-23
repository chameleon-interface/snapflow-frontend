import { useMutation } from '@tanstack/react-query';
import { authControllerPasswordRecovery } from '@/shared/api/generated/endpoints/auth/auth';
import { RequestResetFormData } from '../model/schema';

export const useRequestReset = () => {
  return useMutation({
    mutationFn: (body: RequestResetFormData) =>
      authControllerPasswordRecovery(body),
  });
};
