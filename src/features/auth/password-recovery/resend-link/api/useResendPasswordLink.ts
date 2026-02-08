import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';

// TODO: update endpoint when backend is ready
export const useResendPasswordLink = () => {
  return useMutation({
    mutationFn: (email: string) =>
      api.post<void>('/auth/password-recovery-email-resending', { email }),
  });
};
