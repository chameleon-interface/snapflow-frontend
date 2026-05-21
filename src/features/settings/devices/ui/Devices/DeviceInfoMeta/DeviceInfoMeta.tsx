'use client';

import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import styles from './DeviceInfoMeta.module.css';

type Props = {
  isCurrentDevice?: boolean;
  lastVisitDisplay: string;
};

export const DeviceInfoMeta = ({
  isCurrentDevice,
  lastVisitDisplay,
}: Props) => {
  const t = useTranslations('Devices');

  return (
    <div className={styles.root}>
      {isCurrentDevice ? (
        <Typography className={styles.online} variant="text-14" as="span">
          {t('currentDeviceOnline')}
        </Typography>
      ) : (
        <>
          <Typography variant="small" as="span" className={styles.label}>
            {t('lastVisitLabel')}
          </Typography>
          <Typography variant="text-14" as="span" className={styles.value}>
            {lastVisitDisplay}
          </Typography>
        </>
      )}
    </div>
  );
};
