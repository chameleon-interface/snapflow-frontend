'use client';

import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { useSessionsQuery } from '../../api';
import { useTerminateAllSessionsMutation } from '../../api/useTerminateAllSessionsMutation';
import { ActiveSessionsList } from './ActiveSessionsList';
import { BlockTitle } from './BlockTitle';
import { CurrentSessionCard } from './CurrentSessionCard';
import styles from './Devices.module.css';
import { DevicesLoadError } from './DevicesLoadError';
import { DevicesSkeleton } from './DevicesSkeleton';

export const Devices = () => {
  const t = useTranslations('Devices');
  const {
    data: sessions,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useSessionsQuery();
  const { mutate: terminateAllSessions, isPending } =
    useTerminateAllSessionsMutation();

  const sessionList = sessions ?? [];
  const currentSession = sessionList.find((session) => session.isCurrent);
  const otherSessions = sessionList.filter((session) => !session.isCurrent);

  if (isLoading) {
    return <DevicesSkeleton />;
  }

  if (isError) {
    return <DevicesLoadError onRetry={refetch} isRetrying={isFetching} />;
  }

  return (
    <div className={styles.page} aria-label={t('pageAria')}>
      <section
        className={styles.section}
        aria-labelledby="devices-current-device-title"
      >
        <BlockTitle
          id="devices-current-device-title"
          title={t('currentDeviceTitle')}
        />
        <CurrentSessionCard session={currentSession} />
      </section>

      <div
        className={styles.terminateRow}
        aria-label={t('terminateActionsAria')}
      >
        <Button
          variant="outlined"
          className={styles.terminateAllSessionsButton}
          type="button"
          aria-label={t('terminateAllOtherSessions')}
          onClick={() => terminateAllSessions()}
          disabled={isPending || otherSessions.length === 0}
        >
          {t('terminateAllOtherSessions')}
        </Button>
      </div>

      <section
        className={styles.section}
        aria-labelledby="devices-active-sessions-title"
      >
        <BlockTitle
          id="devices-active-sessions-title"
          title={t('activeSessionsTitle')}
        />
        <ActiveSessionsList sessions={otherSessions} />
      </section>
    </div>
  );
};
