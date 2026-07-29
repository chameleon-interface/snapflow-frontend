import { clsx } from 'clsx';
import s from './NotificationBadge.module.css';

type NotificationBadgeProps = {
  count: number;
  className?: string;
};

const MAX_BADGE_COUNT = 99;

export const NotificationBadge = ({
  count,
  className,
}: NotificationBadgeProps) => {
  if (count <= 0) {
    return null;
  }

  const displayCount = count > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : count;

  return (
    <span className={clsx(s.badge, className)} aria-hidden="true">
      {displayCount}
    </span>
  );
};
