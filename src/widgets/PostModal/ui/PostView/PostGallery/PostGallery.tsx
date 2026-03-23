'use client';

import { Carousel } from 'snapflow-ui-kit/client';
import styles from './PostGallery.module.css';

type Props = {
  photoUrls: string[];
};

export const PostGallery = ({ photoUrls }: Props) => {
  const slides = photoUrls.length ? photoUrls : [''];

  return (
    <div className={styles.root}>
      <Carousel className={styles.carousel}>
        {slides.map((photoUrl, index) => (
          <div key={`${photoUrl}-${index}`} className={styles.slide}>
            {photoUrl ? (
              <div
                role="img"
                aria-label={`Post ${index + 1}`}
                className={styles.slideImage}
                style={{ backgroundImage: `url(${photoUrl})` }}
              />
            ) : (
              <div className={styles.photoFallback} />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
