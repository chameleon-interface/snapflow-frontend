import axios from 'axios';
import { getTranslations } from 'next-intl/server';
import { ProfileContent } from './ProfileContent';
import s from './ProfilePage.module.css';
import { EmptyStateMessage } from '@/shared/ui';
import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/profile/profile';

type Props = {
  id: string;
};

export async function ProfilePage({ id }: Props) {
  const t = await getTranslations('Pages');
  let profile;

  try {
    profile = await profileControllerGetPublicProfile(id);
  } catch (error) {
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

  return <ProfileContent profile={profile} />;
}
