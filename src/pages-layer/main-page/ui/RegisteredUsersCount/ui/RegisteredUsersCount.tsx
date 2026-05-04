'use client';

import { useRegisteredUsersCountQuery } from '@/pages-layer/main-page/api/useRegisteredUsersCountQuery';
import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import { UsersCounter } from './UsersCounter';
import { RegisteredUsersCountSkeleton } from './RegisteredUsersCountSkeleton/RegisteredUsersCountSkeleton';
import styles from './RegisteredUsersCount.module.css';

export const RegisteredUsersCount = () => {
  const { data, isPending } = useRegisteredUsersCountQuery();
  const count = data?.totalCount ?? 0;
  const t = useTranslations('MainPage');

  if (isPending) {
    return <RegisteredUsersCountSkeleton />;
  }

  return (
    <section
      className={styles.registeredUsersContainer}
      aria-labelledby="main-page-registered-users-heading"
    >
      <Typography
        id="main-page-registered-users-heading"
        className={styles.title}
        variant="h2"
        as="h2"
      >
        {t('registeredUsers')}
      </Typography>
      <div className={styles.counterWrap}>
        <UsersCounter count={count} />
      </div>
    </section>
  );
};
