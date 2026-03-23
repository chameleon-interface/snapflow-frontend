'use client';

import { Button, Typography } from 'snapflow-ui-kit';
import styles from './PostPublishBar.module.css';

export const PostPublishBar = () => {
  return (
    <div className={styles.root}>
      <Typography variant="text-14" className={styles.commentInputPlaceholder}>
        Add a Comment...
      </Typography>
      <Button variant="text" className={styles.publishButton}>
        Publish
      </Button>
    </div>
  );
};
