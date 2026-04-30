'use client';

import { Skeleton } from '@/shared/ui';
import s from './PostsBlockSkeleton.module.css';

export const PostsBlockSkeleton = () => {
  return (
    <section
      className={s.postsBlock}
      aria-busy="true"
      aria-label="Loading posts"
    >
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className={s.item}>
          <div className={s.media} aria-hidden>
            <Skeleton variant="wave" height="100%" width="100%" radius={2} />
          </div>

          <div className={s.content} aria-hidden>
            <div className={s.authorRow}>
              <Skeleton variant="pulse" height={36} width={36} radius={999} />
              <div className={s.authorMeta}>
                <Skeleton variant="pulse" height={14} width="70%" radius={6} />
                <div className={s.timeRow}>
                  <Skeleton variant="pulse" height={12} width={96} radius={6} />
                </div>
              </div>
            </div>

            <div className={s.description}>
              <Skeleton variant="pulse" height={12} width="92%" radius={6} />
              <Skeleton variant="pulse" height={12} width="78%" radius={6} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
