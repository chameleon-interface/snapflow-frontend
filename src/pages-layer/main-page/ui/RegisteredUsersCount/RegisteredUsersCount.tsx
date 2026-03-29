'use client';

import { useRegisteredUsersCountQuery } from '../../api';
import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import { UsersCounter } from './UsersCounter';
import styles from './RegisteredUsersCount.module.css';

export const RegisteredUsersCount = () => {
  const { data } = useRegisteredUsersCountQuery();
  const count = data?.totalCount ?? 0;
  const t = useTranslations('MainPage');

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
