import { MainPage } from '@/pages-layer/main-page';
import { getPostsSSR } from '@/pages-layer/main-page/api/ssr/getPostsSSR';
import { getRegisteredUsersCountSSR } from '@/pages-layer/main-page/api/ssr/getRegisteredUsersCountSSR';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: mainPageKeys.registeredUsersCount(),
      queryFn: getRegisteredUsersCountSSR,
    }),
    queryClient.prefetchQuery({
      queryKey: mainPageKeys.posts(),
      queryFn: getPostsSSR,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPage />
    </HydrationBoundary>
  );
}
