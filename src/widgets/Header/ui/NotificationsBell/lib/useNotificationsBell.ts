'use client';

import { useCallback, useRef, useState } from 'react';
import {
  useMarkAllNotificationsReadMutation,
  useNotificationsInfiniteQuery,
  useUnreadNotificationsCountQuery,
} from '@/entities/notification';
import { flattenNotificationPages } from './flattenNotificationPages';
import { useMarkAllReadOnOpen } from './useMarkAllReadOnOpen';
import { useNotificationsPopover } from './useNotificationsPopover';

export const useNotificationsBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: unreadCount = 0 } = useUnreadNotificationsCountQuery();
  const {
    data: listData,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    hasNextPage,
  } = useNotificationsInfiniteQuery();
  const { mutate: markAllRead } = useMarkAllNotificationsReadMutation();

  const notifications = flattenNotificationPages(listData);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const loadMore = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);

  useNotificationsPopover({ isOpen, onClose: close, wrapperRef });
  useMarkAllReadOnOpen(isOpen, markAllRead);

  return {
    isOpen,
    wrapperRef,
    unreadCount,
    notifications,
    toggle,
    loadMore,
    isListLoading: isPending,
    isFetchingNextPage,
    hasNextPage,
  };
};
