'use client';

import { Skeleton } from '@/shared/ui';
import usersCounterStyles from '../UsersCounter/UsersCounter.module.css';
import styles from '../RegisteredUsersCount.module.css';

const DIGITS_COUNT = 6;

export const RegisteredUsersCountSkeleton = () => {
  return (
    <section
      className={styles.registeredUsersContainer}
      aria-busy="true"
      aria-label="Loading registered users count"
    >
      <Skeleton variant="pulse" height={22} width={210} radius={6} />

      <div className={styles.counterWrap}>
        <div className={usersCounterStyles.digitsRow} aria-hidden>
          {Array.from({ length: DIGITS_COUNT }).map((_, index) => (
            <div key={index} className={usersCounterStyles.digitBlock}>
              <div className={usersCounterStyles.digit}>
                <Skeleton variant="pulse" height={18} width={14} radius={4} />
              </div>
              {index < DIGITS_COUNT - 1 && (
                <span className={usersCounterStyles.stick} aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
