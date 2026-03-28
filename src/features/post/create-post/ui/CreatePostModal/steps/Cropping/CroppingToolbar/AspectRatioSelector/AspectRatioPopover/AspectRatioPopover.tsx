'use client';

import { useTranslations } from 'next-intl';
import { AspectRatioOption } from '../AspectRatioOption';
import styles from './AspectRatioPopover.module.css';

type AspectOption = { label: string };

type Props = {
  options: AspectOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export const AspectRatioPopover = ({
  options,
  selectedIndex,
  onSelect,
}: Props) => {
  const t = useTranslations('CreatePost');

  return (
    <div
      className={styles.popover}
      role="listbox"
      aria-label={t('aspectRatioChoice')}
    >
      {options.map((opt, index) => (
        <AspectRatioOption
          key={opt.label}
          label={opt.label}
          isSelected={selectedIndex === index}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
};
