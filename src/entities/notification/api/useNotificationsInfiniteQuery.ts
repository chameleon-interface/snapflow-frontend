'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import {
  mapNotificationFromDto,
  serializeCursor,
} from '../model/mapNotification';
import type { Notification } from '../model/types';
import { notificationsKeys } from '@/shared/api/keys-factories/notificationsKeysFactory';
import { notificationsControllerGetNotifications } from '@/shared/api/generated/endpoints/core/notifications/notifications';
import type { NotificationsPageViewDtoNextCursor } from '@/shared/api/generated/model/core/notificationsPageViewDtoNextCursor';

export const NOTIFICATIONS_PAGE_SIZE = 20;

export type NotificationsInfinitePage = {
  items: Notification[];
  hasMore: boolean;
  nextCursor: NotificationsPageViewDtoNextCursor;
};

type UseNotificationsInfiniteQueryOptions = {
  enabled?: boolean;
};

export const useNotificationsInfiniteQuery = ({
  enabled = true,
}: UseNotificationsInfiniteQueryOptions = {}) => {
  return useInfiniteQuery({
    queryKey: notificationsKeys.list(),
    enabled,
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const page = await notificationsControllerGetNotifications({
        cursor: pageParam,
        limit: NOTIFICATIONS_PAGE_SIZE,
      });

      return {
        items: page.items.map(mapNotificationFromDto),
        hasMore: page.hasMore,
        nextCursor: page.nextCursor,
      } satisfies NotificationsInfinitePage;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return serializeCursor(lastPage.nextCursor);
    },
  });
};
