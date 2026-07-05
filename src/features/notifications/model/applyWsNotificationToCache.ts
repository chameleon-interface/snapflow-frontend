import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import {
  isNotificationWebSocketPayload,
  mapNotificationFromWs,
  type Notification,
  type NotificationsInfinitePage,
} from '@/entities/notification';
import { notificationsKeys } from '@/shared/api/keys-factories/notificationsKeysFactory';

export const incrementUnreadNotificationsCount = (
  queryClient: QueryClient,
): void => {
  queryClient.setQueryData<number>(
    notificationsKeys.unreadCount(),
    (currentCount) => (currentCount ?? 0) + 1,
  );
};

const isDuplicateNotification = (
  items: Notification[],
  incoming: Notification,
): boolean => {
  return items.some(
    (item) =>
      item.id === incoming.id ||
      (item.type === incoming.type && item.createdAt === incoming.createdAt),
  );
};

export const prependNotificationToListCache = (
  queryClient: QueryClient,
  notification: Notification,
): void => {
  queryClient.setQueryData<InfiniteData<NotificationsInfinitePage>>(
    notificationsKeys.list(),
    (currentData) => {
      if (!currentData) {
        return currentData;
      }

      const existingItems = currentData.pages.flatMap((page) => page.items);

      if (isDuplicateNotification(existingItems, notification)) {
        return currentData;
      }

      const [firstPage, ...restPages] = currentData.pages;

      if (!firstPage) {
        return currentData;
      }

      return {
        ...currentData,
        pages: [
          {
            ...firstPage,
            items: [notification, ...firstPage.items],
          },
          ...restPages,
        ],
      };
    },
  );
};

export const applyWsNotificationToCache = (
  queryClient: QueryClient,
  payload: unknown,
): void => {
  if (!isNotificationWebSocketPayload(payload)) {
    return;
  }

  const notification = mapNotificationFromWs(payload);

  incrementUnreadNotificationsCount(queryClient);
  prependNotificationToListCache(queryClient, notification);
};
