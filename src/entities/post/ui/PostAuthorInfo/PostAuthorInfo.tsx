import { UserAvatar } from '@/shared/ui';
import { clsx } from 'clsx';
import { Typography } from 'snapflow-ui-kit';
import styles from './PostAuthorInfo.module.css';

type Props = {
  avatarUrl: string | null;
  className?: string;
  headingId?: string;
  headingTag?: 'h2' | 'h3';
  size?: number;
  username: string;
  usernameClassName?: string;
};

export const PostAuthorInfo = ({
  avatarUrl,
  className,
  headingId,
  headingTag = 'h3',
  size = 36,
  username,
  usernameClassName,
}: Props) => {
  return (
    <div className={clsx(styles.root, className)}>
      <UserAvatar avatarUrl={avatarUrl} size={size} username={username} />
      <Typography
        as={headingTag}
        variant="h3"
        id={headingId}
        className={clsx(styles.username, usernameClassName)}
      >
        {username}
      </Typography>
    </div>
  );
};
