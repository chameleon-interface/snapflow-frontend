import Link from 'next/link';
import { UserAvatar } from '@/shared/ui';
import { clsx } from 'clsx';
import { Typography } from 'snapflow-ui-kit';
import type React from 'react';
import styles from './PostAuthorInfo.module.css';

type TypographyProps = React.ComponentProps<typeof Typography>;

type Props = {
  avatarUrl: string | null;
  className?: string;
  headingId?: string;
  headingTag?: TypographyProps['as'];
  profileHref?: string;
  size?: number;
  variant?: TypographyProps['variant'];
  username: string;
  usernameClassName?: string;
};

export const PostAuthorInfo = ({
  avatarUrl,
  className,
  headingId,
  headingTag = 'h3',
  profileHref,
  size = 36,
  variant = 'h3',
  username,
  usernameClassName,
}: Props) => {
  return (
    <div className={clsx(styles.root, className)}>
      <UserAvatar avatarUrl={avatarUrl} size={size} username={username} />
      <Typography
        as={headingTag}
        variant={variant}
        id={headingId}
        className={clsx(styles.username, usernameClassName)}
      >
        {profileHref ? (
          <Link href={profileHref} className={styles.usernameLink}>
            {username}
          </Link>
        ) : (
          <span className={styles.usernameLink}>{username}</span>
        )}
      </Typography>
    </div>
  );
};
