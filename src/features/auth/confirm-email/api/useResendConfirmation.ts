import { useMutation } from '@tanstack/react-query';
import { authControllerResendingEmail } from '@/shared/api/generated/endpoints/core/auth/auth';

export const useResendConfirmation = () => {
  return useMutation({
    mutationFn: (email: string) => authControllerResendingEmail({ email }),
  });
};
