'use client';

import { Typography } from 'snapflow-ui-kit';
import { LikeIcon } from 'snapflow-ui-kit/icons';
import { PostAuthor } from '../../PostAuthor';
import styles from './PostCommentsPreview.module.css';

type Props = {
  description: string;
  ownerAvatar: string | null;
  ownerName: string;
};

export const PostCommentsPreview = ({
  description,
  ownerAvatar,
  ownerName,
}: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.commentItem}>
        <PostAuthor
          avatarUrl={ownerAvatar}
          username={ownerName}
          showName={false}
        />
        <div className={styles.commentBody}>
          <Typography as="p" variant="text-14" className={styles.commentText}>
            <span className={styles.commentAuthor}>{ownerName}</span>{' '}
            {description}
          </Typography>
          <Typography variant="small" className={styles.commentMeta}>
            2 hours ago
          </Typography>
        </div>
      </div>

      <div className={styles.commentItem}>
        <div className={styles.commentPlaceholderAvatar} />
        <div className={styles.commentBody}>
          <div className={styles.commentPlaceholderLine} />
          <div className={styles.commentPlaceholderLineShort} />
          <Typography variant="small" className={styles.commentMeta}>
            Answer
          </Typography>
        </div>
        <LikeIcon className={styles.commentActionIcon} />
      </div>

      <div className={styles.commentItem}>
        <div className={styles.commentPlaceholderAvatar} />
        <div className={styles.commentBody}>
          <div className={styles.commentPlaceholderLine} />
          <div className={styles.commentPlaceholderLineShort} />
          <Typography variant="small" className={styles.commentMeta}>
            Answer
          </Typography>
        </div>
        <LikeIcon type="filled" className={styles.commentActionIconActive} />
      </div>
    </div>
  );
};
