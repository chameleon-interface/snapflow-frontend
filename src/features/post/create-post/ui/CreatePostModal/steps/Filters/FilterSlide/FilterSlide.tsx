'use client';

import Image from 'next/image';
import styles from './FilterSlide.module.css';

type Props = {
  imageUrl: string;
  filterStyle: string;
};

export const FilterSlide = ({ imageUrl, filterStyle }: Props) => (
  <div className={styles.slide}>
    <div className={styles.slideImageWrap}>
      <Image
        src={imageUrl}
        alt=""
        fill
        unoptimized
        className={styles.image}
        style={{ filter: filterStyle, objectFit: 'contain' }}
        draggable={false}
      />
    </div>
  </div>
);
