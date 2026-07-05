'use client';

import { useQuery } from '@tanstack/react-query';
import { parseUnreadCount } from '../model/mapNotification';
import { notificationsKeys } from '@/shared/api/keys-factories/notificationsKeysFactory';
import { notificationsControllerGetUnreadCount } from '@/shared/api/generated/endpoints/core/notifications/notifications';

type UseUnreadNotificationsCountQueryOptions = {
  enabled?: boolean;
};

export const useUnreadNotificationsCountQuery = ({
  enabled = true,
}: UseUnreadNotificationsCountQueryOptions = {}) => {
  return useQuery({
    queryKey: notificationsKeys.unreadCount(),
    enabled,
    queryFn: async () => {
      const data = await notificationsControllerGetUnreadCount();

      return parseUnreadCount(data.count);
    },
  });
};
