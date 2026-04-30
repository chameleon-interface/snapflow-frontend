'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authControllerLogout } from '@/shared/api/generated/endpoints/auth/auth';
import { authKeys } from '@/shared/api/keys-factories/authKeysFactory';
import { ROUTES } from '@/shared/config';
import { tokenStorage } from '@/shared/lib';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { useTranslations } from 'next-intl';

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: () => authControllerLogout(),
    onMutate: async () => {
      await queryClient.cancelQueries();

      const previousMe = queryClient.getQueryData(authKeys.me());
      queryClient.setQueryData(authKeys.me(), null);
      return { previousMe };
    },
    onSuccess: () => {
      toastSuccess(t('Auth.logOutSuccess'));

      tokenStorage.clear();

      queryClient.clear();

      router.replace(ROUTES.HOME);
    },
    onError: (_error, _variables, context) => {
      if (context?.previousMe != null) {
        queryClient.setQueryData(authKeys.me(), context.previousMe);
      }

      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
