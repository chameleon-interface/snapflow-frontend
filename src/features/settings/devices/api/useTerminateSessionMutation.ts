'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionsControllerDeleteSessionByDeviceId } from '@/shared/api/generated/endpoints/core/sessions/sessions';
import { sessionsKeys } from '@/shared/api/keys-factories/sessionsKeysFactory';
import { useTranslations } from 'next-intl';
import { toastSuccess } from 'snapflow-ui-kit/client';

type TerminateSessionInput = {
  deviceId: string;
};

export const useTerminateSessionMutation = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Devices');

  return useMutation({
    mutationFn: ({ deviceId }: TerminateSessionInput) =>
      sessionsControllerDeleteSessionByDeviceId(deviceId),
    onSuccess: async () => {
      toastSuccess(t('sessionTerminated'));
      await queryClient.invalidateQueries({ queryKey: sessionsKeys.list() });
    },
  });
};
