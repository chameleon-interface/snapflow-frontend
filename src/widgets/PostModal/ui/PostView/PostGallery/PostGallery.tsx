'use client';

import Image from 'next/image';
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
              <Image
                src={photoUrl}
                alt={`Post ${index + 1}`}
                fill
                className={styles.slideImage}
                sizes="(max-width: 900px) 100vw, 50vw"
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
