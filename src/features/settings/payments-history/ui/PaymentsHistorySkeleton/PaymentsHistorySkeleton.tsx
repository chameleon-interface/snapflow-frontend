import { Skeleton } from '@/shared/ui/Skeleton';
import s from './PaymentsHistorySkeleton.module.css';

const TABLE_COLUMNS_COUNT = 5;
const SKELETON_ROWS_COUNT = 4;

export const PaymentsHistorySkeleton = () => {
  return (
    <div className={s.tableWrap}>
      <div className={s.skeletonTable}>
        <div className={s.skeletonRow}>
          {Array.from({ length: TABLE_COLUMNS_COUNT }).map((_, index) => (
            <Skeleton key={index} height={18} radius={4} />
          ))}
        </div>
        {Array.from({ length: SKELETON_ROWS_COUNT }).map((_, rowIndex) => (
          <div className={s.skeletonRow} key={rowIndex}>
            {Array.from({ length: TABLE_COLUMNS_COUNT }).map((_, cellIndex) => (
              <Skeleton key={cellIndex} height={18} radius={4} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
