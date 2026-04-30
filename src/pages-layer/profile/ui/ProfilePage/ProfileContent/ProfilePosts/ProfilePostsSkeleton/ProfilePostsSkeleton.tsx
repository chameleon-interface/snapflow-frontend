'use client';

import { Skeleton } from '@/shared/ui';
import postsStyles from '../ProfilePosts.module.css';

export const ProfilePostsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, idx) => (
        <div key={idx} className={postsStyles.post}>
          <div className={postsStyles.postCarousel}>
            <Skeleton variant="wave" height="100%" width="100%" radius={2} />
          </div>
        </div>
      ))}
    </>
  );
};
