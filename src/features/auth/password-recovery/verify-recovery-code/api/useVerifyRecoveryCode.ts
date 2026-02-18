'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';

export const useVerifyRecoveryCode = (recoveryCode: string) => {
  return useQuery({
    queryKey: ['auth', 'check-password-recovery-code', recoveryCode],
    queryFn: async () => {
      await api.post<void>('/auth/check-password-recovery-code', {
        recoveryCode,
      });
      return true;
    },
    enabled: Boolean(recoveryCode),
    gcTime: 1000 * 60,
  });
};
