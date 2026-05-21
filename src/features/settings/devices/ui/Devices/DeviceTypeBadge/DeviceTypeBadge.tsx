'use client';

import { DesktopIcon, SmartphoneIcon } from 'snapflow-ui-kit/icons';
import { getDeviceCategory } from '@/features/settings/devices/lib/getDeviceCategory';
import styles from './DeviceTypeBadge.module.css';

type Props = {
  deviceType: string | undefined;
};

export const DeviceTypeBadge = ({ deviceType }: Props) => {
  const category = getDeviceCategory(deviceType);

  return (
    <div
      className={styles.root}
      aria-hidden="true"
      data-device-category={category}
    >
      {category === 'mobile' ? (
        <SmartphoneIcon type="stroke" className={styles.icon} />
      ) : (
        <DesktopIcon type="stroke" className={styles.icon} />
      )}
    </div>
  );
};
