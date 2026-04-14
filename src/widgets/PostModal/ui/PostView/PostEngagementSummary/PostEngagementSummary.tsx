'use client';

import { Button, Typography } from 'snapflow-ui-kit';
import { BookMarkIcon, LikeIcon, PaperPlaneIcon } from 'snapflow-ui-kit/icons';
import styles from './PostEngagementSummary.module.css';

export const PostEngagementSummary = () => {
  return (
    <>
      <div className={styles.actionsRow}>
        <div className={styles.actionsLeft}>
          <Button
            variant="text"
            className={styles.iconButton}
            icon={<LikeIcon />}
            aria-label="Like"
          />
          <Button
            variant="text"
            className={styles.iconButton}
            icon={<PaperPlaneIcon />}
            aria-label="Share"
          />
        </div>
        <Button
          variant="text"
          className={styles.iconButton}
          icon={<BookMarkIcon />}
          aria-label="Save"
        />
      </div>

      <div className={styles.infoSection}>
        <div className={styles.likesRow}>
          <div className={styles.likesAvatars}>
            <div className={styles.likesAvatar} />
            <div className={styles.likesAvatarAlt} />
          </div>
          <Typography variant="text-14">2 243 &quot;Like&quot;</Typography>
        </div>
        <Typography variant="small" className={styles.publishDate}>
          July 3, 2021
        </Typography>
      </div>
    </>
  );
};
