'use client';

import { PostCard, useFeedPostsInfiniteQuery } from '@/entities/post';
import { useInfiniteScrollTrigger } from '@/shared/lib/hooks';
import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import s from './FeedPage.module.css';

export function FeedPage() {
  const t = useTranslations('Feed');
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useFeedPostsInfiniteQuery();

  const posts = data?.pages.flatMap((page) => page.items) ?? [];
  const hasPosts = posts.length > 0;
  const errorMessage = error?.message || t('error');
  const loadMoreRef = useInfiniteScrollTrigger({
    enabled: hasNextPage && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: () => fetchNextPage(),
  });

  if (isPending) {
    return null;
  }

  if (!hasPosts) {
    return (
      <section className={s.page}>
        <div className={s.content}>
          <div className={s.stateCard}>
            <Typography as="h1" variant="h2">
              {t('title')}
            </Typography>
            <Typography variant="text-14" className={s.stateText}>
              {isError ? errorMessage : t('empty')}
            </Typography>
            {isError ? (
              <Button type="button" onClick={() => void refetch()}>
                {t('retry')}
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={s.page}>
      <div className={s.content}>
        <div className={s.list}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {isFetchingNextPage ? (
          <Typography variant="text-14" className={s.loaderText}>
            {t('loadingMore')}
          </Typography>
        ) : null}

        {isFetchNextPageError ? (
          <div className={s.loadMoreError}>
            <Typography variant="text-14" className={s.loaderText}>
              {errorMessage}
            </Typography>
            <Button type="button" onClick={() => void fetchNextPage()}>
              {t('retry')}
            </Button>
          </div>
        ) : null}

        <div
          ref={loadMoreRef}
          className={s.loadMoreTrigger}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
