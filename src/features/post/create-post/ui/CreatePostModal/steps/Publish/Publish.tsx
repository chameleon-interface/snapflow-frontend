import { useFileObjectUrls } from '@/features/post/create-post/lib';
import type { ProfileViewDto } from '@/shared/api/generated/model/core';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { Carousel } from 'snapflow-ui-kit/client';
import { PublicationDetailsPanel } from './PublicationDetailsPanel';
import styles from './Publish.module.css';

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
      className={styles.slideImage}
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

      <PublicationDetailsPanel
        profile={profile}
        description={description}
        onDescriptionChange={onDescriptionChange}
        location={location}
        onLocationChange={onLocationChange}
      />
    </div>
  );
};
