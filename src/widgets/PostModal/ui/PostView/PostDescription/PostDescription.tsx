'use client';

import { Typography } from 'snapflow-ui-kit';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import type { Post } from '../../post.types';
import styles from './PostDescription.module.css';

type Props = {
  post: Post;
};

export const PostDescription = ({ post }: Props) => {
  return (
    <div className={styles.root}>
      <UserAvatar
        avatarUrl={post.owner.avatarUrl}
        size={36}
        username={post.owner.username}
      />
      <div className={styles.body}>
        <Typography as="p" variant="text-14" className={styles.text}>
          <span className={styles.author}>{post.owner.username}</span>{' '}
          {post.description}
        </Typography>
        <Typography variant="small" className={styles.meta}>
          2 hours ago
        </Typography>
      </div>
    </div>
  );
};
