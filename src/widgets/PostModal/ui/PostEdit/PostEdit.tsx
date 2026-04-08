'use client';

import { useTranslations } from 'next-intl';
import { Button, Textarea, Typography } from 'snapflow-ui-kit';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import styles from './PostEdit.module.css';

type Props = {
  description: string;
  isPending: boolean;
  isSaveDisabled: boolean;
  maxLength: number;
  ownerAvatar: string | null;
  ownerName: string;
  previewPhotoUrl: string | null;
  onChange: (value: string) => void;
  onSave: () => void;
};

export const PostEdit = ({
  description,
  isPending,
  isSaveDisabled,
  maxLength,
  ownerAvatar,
  ownerName,
  previewPhotoUrl,
  onChange,
  onSave,
}: Props) => {
  const t = useTranslations('Modals.Post');

  return (
    <div className={styles.root}>
      <div className={styles.previewSection}>
        {previewPhotoUrl ? (
          <div
            role="img"
            aria-label="Post preview"
            className={styles.previewImage}
            style={{ backgroundImage: `url(${previewPhotoUrl})` }}
          />
        ) : (
          <div className={styles.previewFallback} />
        )}
      </div>

      <div className={styles.formSection}>
        <div className={styles.author}>
          <UserAvatar avatarUrl={ownerAvatar} size={36} username={ownerName} />
          <Typography variant="text-16-bold">{ownerName}</Typography>
        </div>
        <div className={styles.descriptionArea}>
          <Textarea
            label={t('descriptionLabel')}
            minHeight={120}
            value={description}
            onChange={(event) => onChange(event.target.value)}
            maxLength={maxLength}
            className={styles.descriptionInput}
          />
          <Typography variant="text-14" className={styles.descriptionCounter}>
            {description.length}/{maxLength}
          </Typography>
        </div>
        <div className={styles.footer}>
          <Button
            className={styles.saveButton}
            onClick={onSave}
            disabled={isSaveDisabled || isPending}
          >
            {t('saveChanges')}
          </Button>
        </div>
      </div>
    </div>
  );
};
