'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Textarea } from 'snapflow-ui-kit';
import { Typography } from 'snapflow-ui-kit/client';
import type { ProfileViewDto } from '@/shared/api/generated/model';
import { clsx } from 'clsx';
import styles from './PublicationDetailsPanel.module.css';
import { LocationsField } from './LocationsField';

const DESCRIPTION_MAX_LENGTH = 500;

type Props = {
  profile: ProfileViewDto | undefined;
  description: string;
  onDescriptionChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
};

export const PublicationDetailsPanel = ({
  profile,
  description,
  onDescriptionChange,
  location,
  onLocationChange,
}: Props) => {
  const t = useTranslations('CreatePost');

  return (
    <div
      className={clsx(styles.root, styles.thinVertical)}
      aria-label={t('publicationDetails')}
    >
      <div className={styles.profileRow}>
        {profile?.avatarUrl ? (
          <Image
            className={styles.avatar}
            src={profile.avatarUrl}
            alt={profile?.username ?? ''}
            width={40}
            height={40}
          />
        ) : (
          <div className={styles.avatarPlaceholder} aria-hidden>
            {(profile?.username ?? '?').charAt(0)?.toUpperCase()}
          </div>
        )}
        <Typography variant="text-16">{profile?.username ?? '?'}</Typography>
      </div>

      <div className={styles.fieldGroup}>
        <Textarea
          id="publish-description"
          label={t('addPublicationDescriptions')}
          placeholder={t('descriptionPlaceholder')}
          maxLength={DESCRIPTION_MAX_LENGTH}
          aria-label={t('addPublicationDescriptions')}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          minHeight={120}
          className={styles.textareaWrapper}
        />
        <span className={styles.charCount} aria-live="polite">
          {description.length}/{DESCRIPTION_MAX_LENGTH}
        </span>
      </div>

      <div className={styles.fieldGroup}>
        <LocationsField
          id="publish-location"
          value={location}
          onChange={onLocationChange}
        />
      </div>
    </div>
  );
};
