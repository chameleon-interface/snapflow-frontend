import { clsx } from 'clsx';
import { BellIcon } from 'snapflow-ui-kit/icons';
import { NotificationBadge } from '../NotificationBadge';
import s from '../NotificationsBell.module.css';

type NotificationsBellTriggerProps = {
  isOpen: boolean;
  unreadCount: number;
  ariaLabel: string;
  onToggle: () => void;
};

export const NotificationsBellTrigger = ({
  isOpen,
  unreadCount,
  ariaLabel,
  onToggle,
}: NotificationsBellTriggerProps) => {
  const hasUnread = unreadCount > 0;

  return (
    <button
      type="button"
      className={clsx(
        s.trigger,
        isOpen && s.triggerActive,
        hasUnread && s.triggerHasUnread,
      )}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      onClick={onToggle}
    >
      <span className={s.triggerInner}>
        <BellIcon type="stroke" className={s.icon} aria-hidden />
        <NotificationBadge count={unreadCount} />
      </span>
    </button>
  );
};
