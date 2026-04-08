'use client';

import type { Post } from '../post.types';
import { PostCommentsPreview } from './PostCommentsPreview';
import { PostDescription } from './PostDescription';
import { PostEngagementSummary } from './PostEngagementSummary';
import { PostGallery } from './PostGallery';
import { PostHeader } from './PostHeader';
import { PostPublishBar } from './PostPublishBar';
import styles from './PostView.module.css';

type Props = {
  canManagePost: boolean;
  isAuthorized: boolean;
  post: Post;
  onDelete: () => void;
  onEdit: () => void;
};

export const PostView = ({
  canManagePost,
  isAuthorized,
  post,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <div className={styles.content}>
      <PostGallery photoUrls={post.postMedias.map(({ url }) => url)} />

      <div className={styles.metaSection}>
        <div className={styles.root}>
          <PostHeader
            canManagePost={canManagePost}
            ownerAvatarUrl={post.owner.avatarUrl}
            ownerUsername={post.owner.username}
            onDelete={onDelete}
            onEdit={onEdit}
          />
          <div className={styles.scrollSection}>
            <PostDescription post={post} />
            <PostCommentsPreview />
          </div>
          <PostEngagementSummary />
          {isAuthorized ? <PostPublishBar /> : null}
        </div>
      </div>
    </div>
  );
};
