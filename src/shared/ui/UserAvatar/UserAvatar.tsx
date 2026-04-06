'use client';

import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './UserAvatar.module.css';

type Props = {
  avatarUrl: string | null;
  size: number;
  username: string;
};

const PLACEHOLDER_FONT_SIZE_RATIO = 0.444;

const getRootStyle = (size: number): CSSProperties => ({
  width: size,
  height: size,
  fontSize: `${size * PLACEHOLDER_FONT_SIZE_RATIO}px`,
});

export const UserAvatar = ({ avatarUrl, size, username }: Props) => {
  const t = useTranslations('Common');
  const noAvatar = (username.trim().charAt(0) || '?').toUpperCase();

  if (avatarUrl) {
    return (
      <span className={styles.avatarRoot} style={getRootStyle(size)}>
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
      className={`${styles.avatarRoot} ${styles.avatarPlaceholder}`}
      style={getRootStyle(size)}
    >
      {noAvatar}
    </span>
  );
};
