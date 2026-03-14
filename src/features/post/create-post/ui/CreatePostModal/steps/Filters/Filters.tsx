'use client';

import {
  FILTER_OPTIONS,
  getFilterStyle,
  useFileObjectUrls,
} from '@/features/post/create-post/lib';
import { Carousel } from 'snapflow-ui-kit/client';
import { useTranslations } from 'next-intl';
import { FilterSlide } from './FilterSlide';
import { FilterThumb } from './FilterThumb';
import styles from './Filters.module.css';

type Props = {
  photos: File[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
  filterAt: (index: number) => string;
  onFilterSelect: (slideIndex: number, filterId: string) => void;
};

export const Filters = ({
  photos,
  currentIndex,
  onSlideChange,
  filterAt,
  onFilterSelect,
}: Props) => {
  const t = useTranslations('CreatePost');
  const urls = useFileObjectUrls(photos);

  if (photos.length === 0) return null;

  const currentSlideUrl = urls[currentIndex] ?? urls[0]!;

  return (
    <div className={styles.wrapper} role="region" aria-label={t('filters')}>
      <div className={styles.carouselSection}>
        <Carousel
          className={styles.carousel}
          value={currentIndex}
          onValueChange={onSlideChange}
          hideArrowsWhenSingle
        >
          {urls.map((url, index) => (
            <FilterSlide
              key={url}
              imageUrl={url}
              filterStyle={getFilterStyle(filterAt(index))}
            />
          ))}
        </Carousel>
      </div>
      <aside className={styles.filterPanel} aria-label={t('filterChoice')}>
        <div className={styles.filterGrid}>
          {FILTER_OPTIONS.map(({ id, label }) => (
            <FilterThumb
              key={id}
              id={id}
              label={label}
              imageUrl={currentSlideUrl}
              isSelected={filterAt(currentIndex) === id}
              onSelect={() => onFilterSelect(currentIndex, id)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};
