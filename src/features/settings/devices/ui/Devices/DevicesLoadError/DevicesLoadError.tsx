'use client';

import { useTranslations } from 'next-intl';
import { Button, Card, Typography } from 'snapflow-ui-kit';
import styles from './DevicesLoadError.module.css';

type Props = {
  onRetry: () => void;
  isRetrying: boolean;
};

export const DevicesLoadError = ({ onRetry, isRetrying }: Props) => {
  const t = useTranslations('Devices');
  const tPages = useTranslations('Pages');

  return (
    <div className={styles.root}>
      <Card
        className={styles.card}
        role="alert"
        aria-live="assertive"
        aria-label={t('sessionsLoadFailed')}
      >
        <Typography variant="text-14" className={styles.message}>
          {t('sessionsLoadFailed')}
        </Typography>
        <Button
          variant="outlined"
          type="button"
          className={styles.retryButton}
          onClick={onRetry}
          disabled={isRetrying}
          aria-label={tPages('retry')}
        >
          {tPages('retry')}
        </Button>
      </Card>
    </div>
  );
};
