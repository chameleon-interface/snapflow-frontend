'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '@/entities/user';
import type { NotificationWebSocketPayload } from '@/entities/notification';
import { useNotificationsSocket } from '../api/useNotificationsSocket';
import { applyWsNotificationToCache } from './applyWsNotificationToCache';

type NotificationsProviderProps = {
  children: React.ReactNode;
};

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const queryClient = useQueryClient();
  const { data: me } = useMe();

  const handleNotification = useCallback(
    (payload: NotificationWebSocketPayload) => {
      applyWsNotificationToCache(queryClient, payload);
    },
    [queryClient],
  );

  useNotificationsSocket({
    enabled: Boolean(me),
    onNotification: handleNotification,
  });

  return children;
};
