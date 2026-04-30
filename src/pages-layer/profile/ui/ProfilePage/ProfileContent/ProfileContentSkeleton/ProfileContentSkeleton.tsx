'use client';

import { Skeleton } from '@/shared/ui';
import s from './ProfileContentSkeleton.module.css';

export const ProfileContentSkeleton = () => {
  return (
    <section className={s.page} aria-busy="true" aria-label="Loading profile">
      <header className={s.header}>
        <div className={s.avatar}>
          <Skeleton variant="pulse" height={204} width={204} radius={999} />
        </div>

        <div className={s.info}>
          <div className={s.nameRow}>
            <Skeleton variant="pulse" height={28} width={220} radius={6} />
            <Skeleton variant="pulse" height={36} width={140} radius={6} />
          </div>

          <div className={s.stats}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className={s.stat}>
                <Skeleton variant="pulse" height={20} width={50} radius={6} />
                <Skeleton variant="pulse" height={12} width={90} radius={6} />
              </div>
            ))}
          </div>

          <Skeleton variant="pulse" height={14} width="70%" radius={6} />
          <div style={{ height: 10 }} />
          <Skeleton variant="pulse" height={14} width="55%" radius={6} />
        </div>
      </header>

      <div className={s.grid} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className={s.gridItem}>
            <Skeleton variant="wave" height="100%" width="100%" radius={2} />
          </div>
        ))}
      </div>
    </section>
  );
};
