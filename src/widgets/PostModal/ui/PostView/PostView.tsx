'use client';

import type { Post } from '@/entities/post';
import { PostCommentsPreview } from './PostCommentsPreview';
import { PostEngagementSummary } from './PostEngagementSummary';
import { PostGallery } from './PostGallery';
import { PostHeader } from './PostHeader';
import { PostPublishBar } from './PostPublishBar';
import styles from './PostView.module.css';

type Props = {
  canManagePost: boolean;
  isAuthorized: boolean;
  ownerAvatar: string | null;
  ownerName: string;
  post: Post;
  postPhotos: string[];
  onDelete: () => void;
  onEdit: () => void;
};

export const PostView = ({
  canManagePost,
  isAuthorized,
  ownerAvatar,
  ownerName,
  post,
  postPhotos,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <div className={styles.content}>
      <PostGallery photoUrls={postPhotos} />

      <div className={styles.metaSection}>
        <div className={styles.root}>
          <PostHeader
            canManagePost={canManagePost}
            ownerAvatar={ownerAvatar}
            ownerName={ownerName}
            onDelete={onDelete}
            onEdit={onEdit}
          />
          <PostCommentsPreview
            description={post.description}
            ownerAvatar={ownerAvatar}
            ownerName={ownerName}
          />
          <PostEngagementSummary />
          {isAuthorized ? <PostPublishBar /> : null}
        </div>
      </div>
    </div>
  );
};
