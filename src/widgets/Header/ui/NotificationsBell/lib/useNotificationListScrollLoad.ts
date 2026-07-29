'use client';

import { useEffect, useRef } from 'react';

type UseNotificationListScrollLoadParams = {
  enabled: boolean;
  onLoadMore: () => void;
};

export const useNotificationListScrollLoad = ({
  enabled,
  onLoadMore,
}: UseNotificationListScrollLoadParams) => {
  const listRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const root = listRef.current;
    const target = sentinelRef.current;

    if (!enabled || !root || !target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        onLoadMoreRef.current();
      },
      { root, rootMargin: '80px 0px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [enabled]);

  return { listRef, sentinelRef };
};
