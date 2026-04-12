'use client';

import { PostCardPreview } from '@/entities/post';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit/client';
import { EmptyStateMessage } from '@/shared/ui';
import s from './ProfilePage.module.css';
import { useProfilePostsInfinite } from '../api/useProfilePostsInfinite';

type Props = {
  profileId: string;
  postsCount: number;
};

export function ProfilePosts({ profileId, postsCount }: Props) {
  const t = useTranslations('Pages');
  const tMainPage = useTranslations('MainPage');
  const { posts, observerRef, hasNextPage, isPending, isError, refetch } =
    useProfilePostsInfinite(profileId);

  return (
    <>
      <section className={s.posts}>
        {isError && (
          <EmptyStateMessage className={s.emptyWrapper}>
            <div className={s.stateBlock}>
              <p className={s.stateMessage}>
                {postsCount > 0
                  ? t('profilePostsLoadFailed')
                  : t('profilePostsUnavailable')}
              </p>
              <Button variant="outlined" onClick={() => void refetch()}>
                {t('retry')}
              </Button>
            </div>
          </EmptyStateMessage>
        )}

        {!isPending && !isError && posts.length === 0 && (
          <EmptyStateMessage className={s.emptyWrapper}>
            {tMainPage('noPostsYet')}
          </EmptyStateMessage>
        )}

        {posts.map((post) => (
          <PostCardPreview key={post.id} post={post} variant="compact" />
        ))}
      </section>

      {hasNextPage && <div ref={observerRef} className={s.observer} />}

      {!hasNextPage && posts.length > 0 && (
        <p className={s.endMessage}>{t('allPostsLoaded')}</p>
      )}
    </>
  );
}
