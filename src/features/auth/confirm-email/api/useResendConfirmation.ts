import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';

export const useResendConfirmation = () => {
  return useMutation({
    mutationFn: (email: string) =>
      api.post<void>('/auth/registration-email-resending', { email }),
  });
};
