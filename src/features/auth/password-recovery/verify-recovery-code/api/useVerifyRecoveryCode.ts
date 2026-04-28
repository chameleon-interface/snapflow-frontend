'use client';

import { useQuery } from '@tanstack/react-query';
import { authControllerCheckPasswordRecoveryCode } from '@/shared/api/generated/endpoints/auth/auth';
import { authKeys } from '@/shared/api/keys-factories/authKeysFactory';

export const useVerifyRecoveryCode = (recoveryCode: string) => {
  return useQuery({
    queryKey: authKeys.checkPasswordRecoveryCode(recoveryCode),
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
