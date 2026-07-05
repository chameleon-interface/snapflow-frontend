'use client';

import { clsx } from 'clsx';
import type { Notification } from '@/entities/notification';
import { RelativeTime } from '@/shared/ui/RelativeTime';
import { Typography } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import s from './NotificationItem.module.css';

type NotificationItemProps = {
  notification: Notification;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const t = useTranslations('Notifications');
  const isUnread = !notification.isRead;

  return (
    <article
      className={clsx(s.item, isUnread && s.itemUnread)}
      aria-labelledby={`notification-${notification.id}-title`}
    >
      {isUnread ? <span className={s.unreadIndicator} aria-hidden /> : null}
      <div className={s.content}>
        <div className={s.header}>
          <Typography
            id={`notification-${notification.id}-title`}
            variant="text-14-bold"
            as="h3"
            className={s.title}
          >
            {t('newNotification')}
          </Typography>
          {isUnread ? (
            <span className={s.newBadge}>{t('newBadge')}</span>
          ) : null}
        </div>
        <Typography variant="text-14" as="p" className={s.message}>
          {notification.message}
        </Typography>
        <RelativeTime isoDate={notification.createdAt} className={s.time} />
      </div>
    </article>
  );
};
