'use client';

import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'snapflow-ui-kit/icons';
import styles from './Carousel.module.css';

type Props = {
  children: React.ReactNode[];
  value?: number;
  onValueChange?: (index: number) => void;
  autoPlayInterval?: number;
  className?: string;
  hideArrowsWhenSingle?: boolean;
};

export const Carousel = ({
  children,
  value,
  onValueChange,
  autoPlayInterval = 0,
  className,
  hideArrowsWhenSingle = true,
}: Props) => {
  const slides = Array.isArray(children) ? children : [children];
  const count = slides.length;

  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = value !== undefined;
  const currentIndex = isControlled
    ? Math.min(Math.max(0, value), count - 1)
    : internalIndex;

  const setIndex = useCallback(
    (next: number) => {
      const clamped = (next + count) % count;
      if (!isControlled) setInternalIndex(clamped);
      onValueChange?.(clamped);
    },
    [count, isControlled, onValueChange],
  );

  useEffect(() => {
    if (autoPlayInterval <= 0 || count <= 1) return;
    const id = setInterval(() => setIndex(currentIndex + 1), autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlayInterval, count, currentIndex, setIndex]);

  const t = useTranslations('Carousel');

  if (count === 0) return null;

  const handlePrev = () => setIndex(currentIndex - 1);
  const handleNext = () => setIndex(currentIndex + 1);

  const showArrows = !hideArrowsWhenSingle || count > 1;

  return (
    <div
      className={clsx(styles.root, className)}
      role="region"
      aria-label={t('regionLabel')}
    >
      <div className={styles.trackWrapper}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className={styles.slide}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            className={clsx(styles.arrow, styles.arrowPrev)}
            onClick={handlePrev}
            aria-label={t('prevSlide')}
            tabIndex={0}
          >
            <ArrowLeftIcon width={24} height={24} aria-hidden />
          </button>
          <button
            type="button"
            className={clsx(styles.arrow, styles.arrowNext)}
            onClick={handleNext}
            aria-label={t('nextSlide')}
            tabIndex={0}
          >
            <ArrowRightIcon width={24} height={24} aria-hidden />
          </button>
        </>
      )}

      {count > 1 && (
        <div
          className={styles.dots}
          role="tablist"
          aria-label={t('slideSelection')}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={t('slideNumber', { number: i + 1 })}
              className={clsx(
                styles.dot,
                i === currentIndex && styles.dotActive,
              )}
              onClick={() => setIndex(i)}
              tabIndex={i === currentIndex ? 0 : -1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
