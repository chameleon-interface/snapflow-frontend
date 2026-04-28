'use client';

import { usePopover } from '@/features/post/create-post/lib';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { SearchIcon } from 'snapflow-ui-kit/icons';
import styles from './ZoomSelector.module.css';
import { ZoomPopover } from './ZoomPopover';

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export const ZoomSelector = ({ value, min, max, step, onChange }: Props) => {
  const t = useTranslations('CreatePost');
  const { isOpen, toggle, wrapperRef, triggerRef } = usePopover();

  return (
    <div className={styles.popoverAnchor} ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className={clsx(styles.iconTrigger, isOpen && styles.iconTriggerActive)}
        aria-label={t('zoom')}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={toggle}
      >
        <SearchIcon aria-hidden />
      </button>
      {isOpen && (
        <ZoomPopover
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
        />
      )}
    </div>
  );
};
