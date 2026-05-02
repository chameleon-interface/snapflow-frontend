import { useTerminateSessionMutation } from '@/features/settings/devices/api';
import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import { LogOutIcon } from 'snapflow-ui-kit/icons';
import styles from './DeviceHeader.module.css';

type Props = {
  deviceName: string;
  deviceId: string;
  isActiveSession?: boolean;
};

export const DeviceHeader = ({
  deviceName,
  deviceId,
  isActiveSession,
}: Props) => {
  const t = useTranslations('Devices');
  const deviceNameLabel = deviceName ?? t('unknownDevice');
  const { mutate: terminateSession, isPending } = useTerminateSessionMutation();

  return (
    <div className={styles.cardHeader}>
      <Typography variant="text-16-bold" as="h3" className={styles.title}>
        {deviceNameLabel}
      </Typography>
      <Button
        className={
          isActiveSession
            ? styles.logOutButtonActive
            : styles.logOutButtonHidden
        }
        variant="outlined"
        type="button"
        icon={<LogOutIcon />}
        onClick={() => terminateSession({ deviceId })}
        disabled={isPending}
        aria-label={t('terminateSessionAria')}
      >
        {t('terminateSession')}
      </Button>
    </div>
  );
};
