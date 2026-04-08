'use client';

import { Typography } from 'snapflow-ui-kit';
import { LikeIcon } from 'snapflow-ui-kit/icons';
import styles from './PostCommentsPreview.module.css';

export const PostCommentsPreview = () => {
  return (
    <div className={styles.root}>
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
