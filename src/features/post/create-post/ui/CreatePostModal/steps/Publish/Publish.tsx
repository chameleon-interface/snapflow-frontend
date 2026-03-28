'use client';

import { useFileObjectUrls } from '@/features/post/create-post/lib';
import { Carousel } from 'snapflow-ui-kit/client';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { Textarea } from 'snapflow-ui-kit';
import { Input, Typography } from 'snapflow-ui-kit/client';
import { PinIcon } from 'snapflow-ui-kit/icons';
import type { ProfileViewDto } from '@/shared/api/generated/model';
import type { LocationSuggestion } from './LocationSuggestions';
import { LocationSuggestions } from './LocationSuggestions';
import styles from './Publish.module.css';

const DESCRIPTION_MAX_LENGTH = 500;

const LOCATION_SUGGESTIONS: LocationSuggestion[] = [
  { primary: 'New York', secondary: 'Washington Square Park' },
  { primary: 'London', secondary: 'Trafalgar Square' },
  { primary: 'Paris', secondary: 'Eiffel Tower' },
  { primary: 'Tokyo', secondary: 'Shibuya Crossing' },
  { primary: 'Berlin', secondary: 'Brandenburg Gate' },
];

type Props = {
  photos: File[];
  description: string;
  onDescriptionChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  profile: ProfileViewDto | undefined;
};

const CarouselSlide = ({ url }: { url: string }) => (
  <div className={styles.slideImageWrap}>
    <Image
      src={url}
      alt=""
      fill
      unoptimized
      style={{ objectFit: 'contain' }}
      draggable={false}
    />
  </div>
);

export const Publish = ({
  photos,
  description,
  onDescriptionChange,
  location,
  onLocationChange,
  profile,
}: Props) => {
  const t = useTranslations('CreatePost');
  const urls = useFileObjectUrls(photos);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLocationFocused, setIsLocationFocused] = useState(false);

  const handleSelectLocation = (primary: string, secondary: string) => {
    onLocationChange(`${primary}, ${secondary}`);
    setIsLocationFocused(false);
  };

  if (photos.length === 0) return null;

  return (
    <div className={styles.twoColumnRoot} aria-label={t('publish')}>
      <div className={styles.carouselColumn}>
        <Carousel
          className={styles.carouselFlex}
          value={carouselIndex}
          onValueChange={setCarouselIndex}
          hideArrowsWhenSingle
        >
          {urls.map((url) => (
            <CarouselSlide key={url} url={url} />
          ))}
        </Carousel>
      </div>

      <div
        className={clsx(styles.formPanel, styles.thinVertical)}
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
          <div className={styles.locationBlock}>
            <Input
              id="publish-location"
              type="text"
              label={t('addLocation')}
              placeholder={t('locationPlaceholder')}
              aria-label={t('addLocation')}
              aria-autocomplete="list"
              aria-expanded={isLocationFocused}
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              onFocus={() => setIsLocationFocused(true)}
              onBlur={() => setIsLocationFocused(false)}
              endIcon={<PinIcon />}
              className={styles.locationInputWrapper}
            />
            {isLocationFocused && (
              <LocationSuggestions
                suggestions={LOCATION_SUGGESTIONS}
                onSelect={handleSelectLocation}
                ariaLabel={t('locationSuggestions')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
