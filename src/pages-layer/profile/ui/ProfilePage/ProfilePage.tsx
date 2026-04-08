import axios from 'axios';
import { getTranslations } from 'next-intl/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { EmptyStateMessage } from '@/shared/ui';
import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/profile/profile';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';
import s from './ProfilePage.module.css';
import { ProfileContent } from './ProfileContent/ProfileContent';

type Props = {
  id: string;
};

export async function ProfilePage({ id }: Props) {
  const t = await getTranslations('Pages');
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: profileKeys.userProfile(id),
      queryFn: () => profileControllerGetPublicProfile(id),
    });
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileContent id={id} />
    </HydrationBoundary>
  );
}
