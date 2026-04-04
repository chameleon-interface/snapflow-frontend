'use client';

import { usePopover } from '@/features/post/create-post/lib';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { ExpandIcon } from 'snapflow-ui-kit/icons';
import { AspectRatioPopover } from './AspectRatioPopover';
import styles from './AspectRatioSelector.module.css';

type AspectOption = { label: string };

type Props = {
  options: AspectOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export const AspectRatioSelector = ({
  options,
  selectedIndex,
  onSelect,
}: Props) => {
  const t = useTranslations('CreatePost');
  const { isOpen, toggle, close, wrapperRef, triggerRef } = usePopover();

  const handleSelect = (index: number) => {
    onSelect(index);
    close();
  };

  return (
    <div className={styles.popoverAnchor} ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className={clsx(styles.iconTrigger, isOpen && styles.iconTriggerActive)}
        aria-label={t('aspectRatio')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggle}
      >
        <ExpandIcon />
      </button>
      {isOpen && (
        <AspectRatioPopover
          options={options}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};
