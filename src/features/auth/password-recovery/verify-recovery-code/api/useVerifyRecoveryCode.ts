'use client';

import { useQuery } from '@tanstack/react-query';
import { authControllerCheckPasswordRecoveryCode } from '@/shared/api/generated/endpoints/auth/auth';

export const useVerifyRecoveryCode = (recoveryCode: string) => {
  return useQuery({
    queryKey: ['auth', 'check-password-recovery-code', recoveryCode],
    queryFn: async () => {
      await authControllerCheckPasswordRecoveryCode({
        recoveryCode,
      });
      return true;
    },
    enabled: Boolean(recoveryCode),
    gcTime: 1000 * 60,
  });
};
