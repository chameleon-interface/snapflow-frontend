'use client';

import { CheckmarkIcon } from 'snapflow-ui-kit/icons';
import styles from '../AspectRatioSelector.module.css';

type Props = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const AspectRatioOption = ({ label, isSelected, onSelect }: Props) => (
  <button
    type="button"
    role="option"
    aria-selected={isSelected}
    className={styles.aspectOption}
    onClick={onSelect}
  >
    <span className={styles.aspectOptionLabel}>{label}</span>
    <span className={styles.aspectOptionCheck} aria-hidden>
      {isSelected ? (
        <CheckmarkIcon />
      ) : (
        <span className={styles.aspectOptionCheckEmpty} />
      )}
    </span>
  </button>
);
