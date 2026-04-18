import axios from 'axios';
import { getTranslations } from 'next-intl/server';
import { ProfilePage } from '@/pages-layer/profile';
import { postsControllerGetPostById } from '@/shared/api/generated/endpoints/posts/posts';
import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/profile/profile';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';
import { EmptyStateMessage } from '@/shared/ui';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import s from '@/pages-layer/profile/ui/ProfilePage/ProfilePage.module.css';

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ from?: string; postId?: string }>;
};

export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }: Props) {
  const t = await getTranslations('Pages');
  const queryClient = new QueryClient();
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const postId = resolvedSearchParams?.postId ?? null;

  try {
    await queryClient.fetchQuery({
      queryKey: profileKeys.userProfile(id),
      queryFn: () => profileControllerGetPublicProfile(id),
    });

    if (postId != null) {
      await queryClient.prefetchQuery({
        queryKey: postsKeys.byId(postId),
        queryFn: () => postsControllerGetPostById(postId),
      });
    }
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
      <ProfilePage />
    </HydrationBoundary>
  );
}
