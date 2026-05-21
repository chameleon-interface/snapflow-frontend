'use client';

import { SessionsViewDto } from '@/shared/api/generated/model/sessionsViewDto';
import { Card, Typography } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import { DeviceHeader } from '../DeviceHeader';
import { DeviceInfo } from '../DeviceInfo';
import styles from './ActiveSessionsList.module.css';

type Props = {
  sessions: SessionsViewDto[];
};

export const ActiveSessionsList = ({ sessions }: Props) => {
  const t = useTranslations('Devices');

  if (sessions.length === 0) {
    return (
      <Typography
        variant="text-14"
        as="p"
        className={styles.empty}
        role="status"
        aria-live="polite"
      >
        {t('emptyActiveSessions')}
      </Typography>
    );
  }

  return (
    <div className={styles.list}>
      {sessions.map((session) => {
        return (
          <Card key={session.deviceId} className={styles.card}>
            <DeviceHeader
              deviceName={session.deviceName}
              deviceId={session.deviceId}
              deviceType={session.deviceType}
              isActiveSession
            />
            <DeviceInfo session={session} isCurrentDevice={session.isCurrent} />
          </Card>
        );
      })}
    </div>
  );
};
