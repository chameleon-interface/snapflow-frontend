'use client';

import { useQuery } from '@tanstack/react-query';
import { sessionsControllerGetAllSessions } from '@/shared/api/generated/endpoints/core/sessions/sessions';
import type { SessionsViewDto } from '@/shared/api/generated/model/core';
import { sessionsKeys } from '@/shared/api/keys-factories/sessionsKeysFactory';

export const useSessionsQuery = () => {
  return useQuery<SessionsViewDto[]>({
    queryKey: sessionsKeys.list(),
    queryFn: () => sessionsControllerGetAllSessions(),
    staleTime: 30 * 1000,
    meta: { globalErrorHandler: false },
  });
};
