'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/shared/api/instance';

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),

    onSuccess: () => {
      localStorage.removeItem('accessToken');

      // Invalidate auth queries (prepared for Me query integration)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

      router.push('/');
    },
  });
};
