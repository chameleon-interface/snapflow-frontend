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
      {Array.from({ length: 12 }).map((_, idx) => (
        <div key={idx} className={s.item}>
          <Skeleton variant="wave" height="100%" width="100%" radius={2} />
        </div>
      ))}
    </section>
  );
};
