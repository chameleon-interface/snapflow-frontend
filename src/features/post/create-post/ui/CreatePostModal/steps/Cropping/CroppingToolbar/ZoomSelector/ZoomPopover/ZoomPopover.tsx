'use client';

import { useTranslations } from 'next-intl';
import styles from './ZoomPopover.module.css';

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export const ZoomPopover = ({ value, min, max, step, onChange }: Props) => {
  const t = useTranslations('CreatePost');
  const progressPercent = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className={styles.popover} role="dialog" aria-label={t('zoomDialog')}>
      <div
        className={styles.sliderWrapper}
        style={{ ['--slider-progress' as string]: `${progressPercent}%` }}
      >
        <input
          type="range"
          className={styles.slider}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={t('zoomImage')}
        />
      </div>
    </div>
  );
};
