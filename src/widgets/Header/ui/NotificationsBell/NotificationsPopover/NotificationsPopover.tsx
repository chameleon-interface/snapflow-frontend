import type { Notification } from '@/entities/notification';
import { Typography } from 'snapflow-ui-kit';
import { NotificationList } from '../NotificationList';
import s from '../NotificationsBell.module.css';

type NotificationsPopoverProps = {
  title: string;
  notifications: Notification[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
};

export const NotificationsPopover = ({
  title,
  notifications,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
}: NotificationsPopoverProps) => {
  return (
    <div
      className={s.popover}
      role="dialog"
      aria-label={title}
      aria-modal="false"
    >
      <div className={s.header}>
        <Typography variant="text-16-bold" as="h2" className={s.title}>
          {title}
        </Typography>
      </div>
      <div className={s.body}>
        <NotificationList
          notifications={notifications}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          onLoadMore={onLoadMore}
        />
      </div>
    </div>
  );
};
