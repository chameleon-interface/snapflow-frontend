'use client';

import type { Notification } from '@/entities/notification';
import { Typography } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import { NotificationItem } from '../NotificationItem';
import { useNotificationListScrollLoad } from '../lib/useNotificationListScrollLoad';
import { NotificationListState } from './NotificationListState';
import s from './NotificationList.module.css';

type NotificationListProps = {
  notifications: Notification[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
};

export const NotificationList = ({
  notifications,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  onLoadMore,
}: NotificationListProps) => {
  const t = useTranslations('Notifications');

  const canLoadMore = hasNextPage && !isFetchingNextPage;

  const { listRef, sentinelRef } = useNotificationListScrollLoad({
    enabled: canLoadMore,
    onLoadMore: () => onLoadMore?.(),
  });

  if (isLoading) {
    return <NotificationListState message={t('loading')} />;
  }

  if (notifications.length === 0) {
    return <NotificationListState message={t('empty')} />;
  }

  return (
    <div ref={listRef} className={s.list} role="list" aria-label={t('title')}>
      {notifications.map((notification) => (
        <div key={notification.id} role="listitem">
          <NotificationItem notification={notification} />
        </div>
      ))}
      <div ref={sentinelRef} className={s.sentinel} aria-hidden />
      {isFetchingNextPage ? (
        <Typography variant="text-14" className={s.loadingMore}>
          {t('loadingMore')}
        </Typography>
      ) : null}
    </div>
  );
};
