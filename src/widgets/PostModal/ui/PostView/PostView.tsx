import type { PostViewDto } from '@/shared/api/generated/model/core';
import { PostCommentsPreview } from './PostCommentsPreview';
import { PostDescription } from './PostDescription';
import { PostEngagementSummary } from './PostEngagementSummary';
import { PostGallery } from './PostGallery';
import { PostHeader } from './PostHeader';
import { PostPublishBar } from './PostPublishBar';
import styles from './PostView.module.css';

type Props = {
  isOwner: boolean;
  post: PostViewDto;
  showPublishBar: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

export const PostView = ({
  isOwner,
  post,
  showPublishBar,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.galleryWrapper}>
        <PostGallery photoUrls={post.postMedias.map(({ url }) => url)} />
      </div>

      <div className={styles.metaSection}>
        <div className={styles.root}>
          <PostHeader
            isOwner={isOwner}
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
          {showPublishBar ? <PostPublishBar /> : null}
        </div>
      </div>
    </div>
  );
};
