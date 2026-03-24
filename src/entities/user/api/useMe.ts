import { useQuery } from '@tanstack/react-query';
import { authControllerMe } from '@/shared/api/generated/endpoints/auth/auth';

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authControllerMe(),
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
    retryOnMount: false,
    // 401/404 here often means "not logged in" — not a global failure toast
    meta: { globalErrorHandler: false },
  });
};
