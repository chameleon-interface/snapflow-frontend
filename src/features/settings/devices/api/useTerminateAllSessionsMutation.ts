'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionsControllerDeleteAllSessions } from '@/shared/api/generated/endpoints/sessions/sessions';
import { sessionsKeys } from '@/shared/api/keys-factories/sessionsKeysFactory';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { useTranslations } from 'next-intl';

export const useTerminateAllSessionsMutation = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Devices');

  return useMutation({
    mutationFn: () => sessionsControllerDeleteAllSessions(),
    onSuccess: async () => {
      toastSuccess(t('allSessionsTerminated'));
      await queryClient.invalidateQueries({ queryKey: sessionsKeys.list() });
    },
  });
};
