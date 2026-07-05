import type {
  Notification,
  NotificationsInfinitePage,
} from '@/entities/notification';
import type { InfiniteData } from '@tanstack/react-query';

export const flattenNotificationPages = (
  data: InfiniteData<NotificationsInfinitePage> | undefined,
): Notification[] => {
  return data?.pages.flatMap((page) => page.items) ?? [];
};
