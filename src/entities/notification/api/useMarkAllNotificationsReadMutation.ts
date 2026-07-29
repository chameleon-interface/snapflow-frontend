'use client';

import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { notificationsKeys } from '@/shared/api/keys-factories/notificationsKeysFactory';
import { notificationsControllerMarkAllRead } from '@/shared/api/generated/endpoints/core/notifications/notifications';
import type { NotificationsInfinitePage } from './useNotificationsInfiniteQuery';

export const useMarkAllNotificationsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsControllerMarkAllRead(),
    onSuccess: () => {
      queryClient.setQueryData<number>(notificationsKeys.unreadCount(), 0);

      queryClient.setQueryData<InfiniteData<NotificationsInfinitePage>>(
        notificationsKeys.list(),
        (currentData) => {
          if (!currentData) {
            return currentData;
          }

          return {
            ...currentData,
            pages: currentData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => ({
                ...item,
                isRead: true,
              })),
            })),
          };
        },
      );
    },
  });
};
