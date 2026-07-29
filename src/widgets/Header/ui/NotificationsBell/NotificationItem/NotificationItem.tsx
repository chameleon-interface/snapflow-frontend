'use client';

import { clsx } from 'clsx';
import type { Notification } from '@/entities/notification';
import { formatIsoDatesInText } from '@/shared/lib';
import { RelativeTime } from '@/shared/ui/RelativeTime';
import { Typography } from 'snapflow-ui-kit';
import { useLocale, useTranslations } from 'next-intl';
import s from './NotificationItem.module.css';

type NotificationItemProps = {
  notification: Notification;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const locale = useLocale();
  const t = useTranslations('Notifications');
  const isUnread = !notification.isRead;
  const formattedMessage = formatIsoDatesInText(notification.message, locale);

  return (
    <article
      className={clsx(s.item, isUnread ? s.itemUnread : s.itemRead)}
      aria-labelledby={`notification-${notification.id}-title`}
    >
      <div className={s.content}>
        <div className={s.header}>
          {isUnread ? (
            <span className={s.unreadIndicatorWrap} aria-hidden>
              <span className={s.unreadIndicator} />
            </span>
          ) : null}
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
          {formattedMessage}
        </Typography>
        <RelativeTime isoDate={notification.createdAt} className={s.time} />
      </div>
    </article>
  );
};
