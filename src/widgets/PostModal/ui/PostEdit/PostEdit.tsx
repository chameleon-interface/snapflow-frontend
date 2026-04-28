'use client';

import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import type { OwnerViewDto } from '@/shared/api/generated/model';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import { PostDescriptionField } from '@/shared/ui';
import styles from './PostEdit.module.css';

type Props = {
  description: string;
  isPending: boolean;
  isSaveDisabled: boolean;
  maxLength: number;
  owner: OwnerViewDto;
  previewPhotoUrl: string | null;
  onChange: (value: string) => void;
  onSave: () => void;
};

export const PostEdit = ({
  description,
  isPending,
  isSaveDisabled,
  maxLength,
  owner,
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
          <UserAvatar
            avatarUrl={owner.avatarUrl}
            size={36}
            username={owner.username}
          />
          <Typography variant="text-16-bold">{owner.username}</Typography>
        </div>
        <div className={styles.descriptionArea}>
          <PostDescriptionField
            label={t('descriptionLabel')}
            minHeight={120}
            value={description}
            maxLength={maxLength}
            onChange={onChange}
          />
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
