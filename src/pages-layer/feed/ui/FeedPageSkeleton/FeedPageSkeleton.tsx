'use client';

import { Skeleton } from '@/shared/ui';
import s from './FeedPageSkeleton.module.css';

export const FeedPageSkeleton = () => {
  return (
    <section className={s.page} aria-busy="true" aria-label="Loading feed">
      <div className={s.content}>
        <div className={s.list}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <article key={idx} className={s.card}>
              <div className={s.headerRow}>
                <div className={s.author}>
                  <Skeleton
                    variant="pulse"
                    height={36}
                    width={36}
                    radius={999}
                  />
                  <div className={s.meta}>
                    <Skeleton
                      variant="pulse"
                      height={14}
                      width={140}
                      radius={6}
                    />
                    <Skeleton
                      variant="pulse"
                      height={12}
                      width={90}
                      radius={6}
                    />
                  </div>
                </div>
                <Skeleton variant="pulse" height={24} width={24} radius={6} />
              </div>

              <div className={s.media}>
                <div className={s.mediaFrame}>
                  <Skeleton
                    variant="wave"
                    height="100%"
                    width="100%"
                    radius={2}
                  />
                </div>
              </div>

              <div className={s.actions}>
                <div className={s.actionsLeft}>
                  <Skeleton variant="pulse" height={24} width={24} radius={6} />
                  <Skeleton variant="pulse" height={24} width={24} radius={6} />
                  <Skeleton variant="pulse" height={24} width={24} radius={6} />
                </div>
                <Skeleton variant="pulse" height={24} width={24} radius={6} />
              </div>

              <Skeleton variant="pulse" height={14} width="85%" radius={6} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
