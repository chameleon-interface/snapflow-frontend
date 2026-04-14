import { ProfilePage } from '@/pages-layer/profile';
import { postsControllerGetPostById } from '@/shared/api/generated/endpoints/posts/posts';
import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/profile/profile';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ from?: string; postId?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const queryClient = new QueryClient();
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const from = resolvedSearchParams?.from ?? null;
  const postId = resolvedSearchParams?.postId ?? null;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: profileKeys.userProfile(id),
      queryFn: () => profileControllerGetPublicProfile(id),
    }),
    ...(postId != null
      ? [
          queryClient.prefetchQuery({
            queryKey: postsKeys.byId(postId),
            queryFn: () => postsControllerGetPostById(postId),
          }),
        ]
      : []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage id={id} postId={postId} from={from} />
    </HydrationBoundary>
  );
}
