'use client';

import { PostCard, useFeedPostsInfiniteQuery } from '@/entities/post';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef } from 'react';
import { Button, Typography } from 'snapflow-ui-kit';
import s from './FeedPage.module.css';

export function FeedPage() {
  const t = useTranslations('Feed');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useFeedPostsInfiniteQuery();

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      {
        rootMargin: '300px 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) {
    return null;
  }

  if (isError) {
    return (
      <section className={s.page}>
        <div className={s.content}>
          <div className={s.stateCard}>
            <Typography as="h1" variant="h2">
              {t('title')}
            </Typography>
            <Typography variant="text-14" className={s.stateText}>
              {error?.message || t('error')}
            </Typography>
            <Button type="button" onClick={() => void refetch()}>
              {t('retry')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className={s.page}>
        <div className={s.content}>
          <div className={s.stateCard}>
            <Typography as="h1" variant="h2">
              {t('title')}
            </Typography>
            <Typography variant="text-14" className={s.stateText}>
              {t('empty')}
            </Typography>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={s.page} aria-label={t('title')}>
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

        <div
          ref={loadMoreRef}
          className={s.loadMoreTrigger}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
