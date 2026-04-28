'use client';

import { clsx } from 'clsx';
import type React from 'react';
import { Textarea } from 'snapflow-ui-kit';
import styles from './PostDescriptionField.module.css';

type Props = {
  id?: string;
  label: string;
  placeholder?: string;
  ariaLabel?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  minHeight?: number;
  className?: string;
};

export const PostDescriptionField = ({
  id,
  label,
  placeholder,
  ariaLabel,
  value,
  onChange,
  maxLength,
  minHeight = 120,
  className,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={clsx(styles.root, className)}>
      <Textarea
        id={id}
        label={label}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-label={ariaLabel ?? label}
        value={value}
        onChange={handleChange}
        minHeight={minHeight}
        className={styles.textarea}
      />
      <span className={styles.counter} aria-live="polite">
        {value.length}/{maxLength}
      </span>
    </div>
  );
};
