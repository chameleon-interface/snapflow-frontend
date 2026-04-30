'use client';

import { Skeleton } from '@/shared/ui';
import s from './SidebarSkeleton.module.css';

const MENU_ITEMS_COUNT = 7;

export const SidebarSkeleton = () => {
  return (
    <div className={s.wrap} aria-busy="true" aria-label="Loading navigation">
      <div className={s.menu}>
        {Array.from({ length: MENU_ITEMS_COUNT }).map((_, idx) => (
          <div key={idx} className={s.item}>
            <Skeleton variant="pulse" height={24} width={24} radius={6} />
            <Skeleton variant="pulse" height={14} width={120} radius={6} />
          </div>
        ))}
      </div>

      <div className={s.logout}>
        <div className={s.item}>
          <Skeleton variant="pulse" height={24} width={24} radius={6} />
          <Skeleton variant="pulse" height={14} width={96} radius={6} />
        </div>
      </div>
    </div>
  );
};
