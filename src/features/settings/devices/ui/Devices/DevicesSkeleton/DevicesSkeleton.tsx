'use client';

import { Skeleton } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import styles from './DevicesSkeleton.module.css';

type DeviceCardSkeletonVariant = 'current' | 'active';

const DeviceCardSkeleton = ({
  variant,
}: {
  variant: DeviceCardSkeletonVariant;
}) => {
  const rows = Array.from({ length: 4 });

  const body = (
    <>
      <Skeleton variant="pulse" height={22} width="42%" radius={6} />
      <div className={styles.rows}>
        {rows.map((_, idx) => (
          <div key={idx} className={styles.row}>
            <Skeleton variant="pulse" height={14} width="76%" radius={4} />
            <Skeleton variant="pulse" height={14} width="100%" radius={4} />
          </div>
        ))}
      </div>
      <div className={styles.meta}>
        <Skeleton variant="pulse" height={13} width={132} radius={4} />
        <Skeleton variant="pulse" height={14} width={96} radius={4} />
      </div>
    </>
  );

  if (variant === 'current') {
    return (
      <div className={styles.cardShell}>
        <div className={styles.deviceBlock}>{body}</div>
      </div>
    );
  }

  return (
    <div className={styles.cardShell}>
      <div className={styles.cardHeaderRow}>
        <div className={styles.deviceBlock}>{body}</div>
        <div className={styles.logoutSlot}>
          <Skeleton variant="pulse" height={36} width={92} radius={8} />
        </div>
      </div>
    </div>
  );
};

export const DevicesSkeleton = () => {
  const t = useTranslations('Devices');

  return (
    <div className={styles.root} aria-busy="true" aria-label={t('pageAria')}>
      <section>
        <Skeleton
          className={styles.sectionTitle}
          variant="pulse"
          height={26}
          width="38%"
          radius={6}
        />
        <DeviceCardSkeleton variant="current" />
      </section>

      <div className={styles.terminateRow}>
        <Skeleton
          className={styles.terminateButton}
          variant="pulse"
          width="min(320px, 100%)"
          height={44}
          radius={8}
        />
      </div>

      <section>
        <Skeleton
          className={styles.sectionTitle}
          variant="pulse"
          height={26}
          width="36%"
          radius={6}
        />
        <div className={styles.activeList}>
          <DeviceCardSkeleton variant="active" />
          <DeviceCardSkeleton variant="active" />
        </div>
      </section>
    </div>
  );
};
