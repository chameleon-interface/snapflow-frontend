'use client';

import Image from 'next/image';
import { Typography } from 'snapflow-ui-kit';
import styles from './PostAuthor.module.css';

type Props = {
  avatarUrl: string | null;
  showName?: boolean;
  username: string;
};

export const PostAuthor = ({ avatarUrl, showName = true, username }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.avatarWrapper}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={username}
            width={36}
            height={36}
            className={styles.avatar}
          />
        ) : (
          <div aria-hidden="true" className={styles.avatarFallback}>
            {username.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      {showName ? (
        <Typography variant="text-16-bold">{username}</Typography>
      ) : null}
    </div>
  );
};
