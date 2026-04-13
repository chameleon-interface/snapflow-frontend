'use client';

import type { PostViewDto } from '@/shared/api/generated/model';
import { Typography } from 'snapflow-ui-kit';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import styles from './PostDescription.module.css';

type Props = {
  post: PostViewDto;
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
          {post.description ?? ''}
        </Typography>
        <Typography variant="small" className={styles.meta}>
          2 hours ago
        </Typography>
      </div>
    </div>
  );
};
