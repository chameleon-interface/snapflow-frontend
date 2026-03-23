'use client';

import { useQuery } from '@tanstack/react-query';
import { authControllerConfirmRegistration } from '@/shared/api/generated/endpoints/auth/auth';

export const useConfirmEmail = (code: string) => {
  return useQuery({
    queryKey: ['auth', 'registration-confirmation', code],
    queryFn: async () => {
      await authControllerConfirmRegistration({ code });
      return true;
    },
    enabled: Boolean(code),
    gcTime: 1000 * 60,
  });
};
