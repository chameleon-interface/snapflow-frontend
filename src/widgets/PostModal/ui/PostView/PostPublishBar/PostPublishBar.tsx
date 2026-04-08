'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { Input, toastSuccess } from 'snapflow-ui-kit/client';
import styles from './PostPublishBar.module.css';

export const PostPublishBar = () => {
  const t = useTranslations('Modals.Post');
  const [comment, setComment] = useState('');

  const handlePublish = () => {
    toastSuccess(t('publishCommentSuccess'));
    setComment('');
  };

  return (
    <div className={styles.root}>
      <Input
        type="text"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={t('addCommentPlaceholder')}
        aria-label={t('addCommentPlaceholder')}
        className={styles.commentInput}
      />
      <Button
        variant="text"
        className={styles.publishButton}
        onClick={handlePublish}
      >
        {t('publishCommentAction')}
      </Button>
    </div>
  );
};
