'use client';

import { useTranslations } from 'next-intl';
import { NotificationsBellTrigger } from './NotificationsBellTrigger';
import { NotificationsPopover } from './NotificationsPopover';
import { useNotificationsBell } from './lib/useNotificationsBell';
import s from './NotificationsBell.module.css';

export const NotificationsBell = () => {
  const t = useTranslations('Notifications');
  const {
    isOpen,
    wrapperRef,
    unreadCount,
    notifications,
    toggle,
    loadMore,
    isListLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useNotificationsBell();

  const ariaLabel =
    unreadCount > 0
      ? t('ariaLabelWithCount', { count: unreadCount })
      : t('ariaLabel');

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <NotificationsBellTrigger
        isOpen={isOpen}
        unreadCount={unreadCount}
        ariaLabel={ariaLabel}
        onToggle={toggle}
      />

      {isOpen ? (
        <NotificationsPopover
          title={t('title')}
          notifications={notifications}
          isLoading={isListLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          onLoadMore={loadMore}
        />
      ) : null}
    </div>
  );
};
