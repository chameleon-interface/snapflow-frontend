'use client';

import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './UserAvatar.module.css';

type Props = {
  avatarUrl: string | null;
  className?: string;
  size: number;
  username: string;
};

const PLACEHOLDER_FONT_SIZE_RATIO = 0.444;

const getRootStyle = (size: number): CSSProperties => ({
  ['--avatar-size' as string]: `${size}px`,
  ['--avatar-font-size' as string]: `${size * PLACEHOLDER_FONT_SIZE_RATIO}px`,
});

export const UserAvatar = ({ avatarUrl, className, size, username }: Props) => {
  const t = useTranslations('Common');
  const noAvatar = (username.trim().charAt(0) || '?').toUpperCase();

  if (avatarUrl) {
    return (
      <span
        className={clsx(styles.avatarRoot, className)}
        style={getRootStyle(size)}
      >
        <Image
          className={styles.avatarImage}
          src={avatarUrl}
          alt={t('userProfilePhotoAlt', { name: username })}
          fill
          sizes={`${size}px`}
        />
      </span>
    );
  }

  return (
    <span
      className={clsx(styles.avatarRoot, styles.avatarPlaceholder, className)}
      style={getRootStyle(size)}
    >
      {noAvatar}
    </span>
  );
};
