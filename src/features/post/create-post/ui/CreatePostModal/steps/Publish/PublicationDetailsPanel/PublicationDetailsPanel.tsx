'use client';

import { useTranslations } from 'next-intl';
import type { ProfileViewDto } from '@/shared/api/generated/model';
import { clsx } from 'clsx';
import styles from './PublicationDetailsPanel.module.css';
import { LocationsField } from './LocationsField';
import { PostAuthorInfo } from '@/entities/post/ui/PostAuthorInfo/PostAuthorInfo';
import { PostDescriptionField } from '@/shared/ui';

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
      <PostAuthorInfo
        className={styles.profileRow}
        avatarUrl={profile?.avatarUrl ?? null}
        size={40}
        username={profile?.username ?? '?'}
        headingTag="span"
        variant="text-16"
      />

      <PostDescriptionField
        className={styles.fieldGroup}
        id="publish-description"
        label={t('addPublicationDescriptions')}
        placeholder={t('descriptionPlaceholder')}
        ariaLabel={t('addPublicationDescriptions')}
        value={description}
        onChange={onDescriptionChange}
        maxLength={DESCRIPTION_MAX_LENGTH}
        minHeight={120}
      />

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
