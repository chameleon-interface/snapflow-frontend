'use client';

import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import styles from './UsersCounter.module.css';

const DIGITS_COUNT = 6;

type Props = {
  count: number;
};

export const UsersCounter = ({ count }: Props) => {
  const t = useTranslations('MainPage');
  const digitsString = String(count).padStart(DIGITS_COUNT, '0');
  const digits = digitsString.split('');

  return (
    <div
      className={styles.digitsRow}
      aria-label={t('registeredUsersCountAria', { count })}
    >
      {digits.map((digit, index) => (
        <div key={index} className={styles.digitBlock}>
          <Typography className={styles.digit} as="h2" variant="h2">
            {digit}
          </Typography>
          {index < digits.length - 1 && (
            <span className={styles.stick} aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
};
