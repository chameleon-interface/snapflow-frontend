'use client';

import axios from 'axios';
import { useTranslations } from 'next-intl';
import { ProfileContent } from './ProfileContent';
import s from './ProfilePage.module.css';
import { EmptyStateMessage } from '@/shared/ui';
import { usePublicProfileQuery } from '../api/usePublicProfileQuery';

type Props = {
  id: string;
};

export function ProfilePage({ id }: Props) {
  const t = useTranslations('Pages');
  const {
    data: profile,
    isPending,
    isError,
    error,
  } = usePublicProfileQuery(id);

  if (isPending) {
    return null;
  }

  if (isError) {
    const isNotFound =
      axios.isAxiosError(error) && error.response?.status === 404;

    return (
      <section className={s.pageState}>
        <EmptyStateMessage className={s.pageStateMessage}>
          {isNotFound ? t('profileNotFound') : t('profileLoadFailed')}
        </EmptyStateMessage>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className={s.pageState}>
        <EmptyStateMessage className={s.pageStateMessage}>
          {t('profileNotFound')}
        </EmptyStateMessage>
      </section>
    );
  }

  return <ProfileContent profile={profile} />;
}
