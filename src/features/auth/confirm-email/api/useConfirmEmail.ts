'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';

export const useConfirmEmail = (code: string) => {
  return useQuery({
    queryKey: ['auth', 'registration-confirmation', code],
    queryFn: async () => {
      await api.post<void>('/auth/registration-confirmation', { code });
      return true;
    },
    enabled: Boolean(code),
    gcTime: 1000 * 60,
  });
};
