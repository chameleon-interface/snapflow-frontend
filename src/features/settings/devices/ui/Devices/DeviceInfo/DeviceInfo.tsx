'use client';

import { SessionsViewDto } from '@/shared/api/generated/model/core';
import { formatIsoToDdMmYyyy } from '@/shared/lib/formatDate';
import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import styles from './DeviceInfo.module.css';
import { DeviceInfoMeta } from '../DeviceInfoMeta';

type Props = {
  session?: SessionsViewDto;
  isCurrentDevice?: boolean;
};

export const DeviceInfo = ({ session, isCurrentDevice }: Props) => {
  const t = useTranslations('Devices');

  const browserName = session?.browserName ?? t('unknownBrowser');
  const osName = session?.osName ?? t('unknownOs');
  const osVersion = session?.osVersion ?? t('unknownOsVersion');
  const deviceType = session?.deviceType ?? t('unknownDeviceType');
  const ip = session?.ip ?? t('unknownIp');
  const lastVisit = session?.lastActive;
  const lastVisitLabel =
    lastVisit != null && lastVisit !== ''
      ? formatIsoToDdMmYyyy(lastVisit)
      : t('unknownLastVisit');

  const browserVersionSuffix =
    session?.browserVersion != null && session.browserVersion !== ''
      ? ` · ${session.browserVersion}`
      : '';

  const renderRow = (label: string, value: string) => (
    <div className={styles.row} key={label}>
      <dt className={styles.term}>
        <Typography variant="small" as="span" className={styles.labelText}>
          {label}
        </Typography>
      </dt>
      <dd className={styles.detail}>
        <Typography variant="text-14" className={styles.valueText}>
          {value}
        </Typography>
      </dd>
    </div>
  );

  return (
    <div className={styles.root}>
      <dl className={styles.details}>
        {renderRow(t('deviceTypeLabel'), deviceType)}
        {renderRow(t('browserLabel'), `${browserName}${browserVersionSuffix}`)}
        {renderRow(t('osLabel'), `${osName} ${osVersion}`.trim())}
        {renderRow(t('ipLabel'), ip)}
      </dl>

      <DeviceInfoMeta
        isCurrentDevice={isCurrentDevice}
        lastVisitDisplay={lastVisitLabel}
      />
    </div>
  );
};
