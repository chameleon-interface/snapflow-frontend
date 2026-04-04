'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit/client';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import { useMe } from '@/entities/user';
import { EmptyStateMessage } from '@/shared/ui';
import s from './ProfilePage.module.css';
import { useProfilePostsInfinite } from '../api/useProfilePostsInfinite';

type Props = {
  profileId: string;
  postsCount: number;
};

export function ProfilePosts({ profileId, postsCount }: Props) {
  const t = useTranslations('Pages');
  const { data: me } = useMe();
  const isOwner = me?.userId === profileId;
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
            {isOwner ? t('noPostsOwn') : t('noPostsGuest')}
          </EmptyStateMessage>
        )}

        {posts.map((post) => (
          <article key={post.id} className={s.post}>
            {post.mediaCount > 1 && (
              <div className={s.multiMediaBadge}>
                <ImageIcon aria-hidden />
                <span>{post.mediaCount}</span>
              </div>
            )}
            <Image
              src={post.photo}
              alt={`Post ${post.id}`}
              width={234}
              height={228}
              sizes="(max-width: 600px) 150px, 234px"
              style={{ objectFit: 'cover' }}
            />
          </article>
        ))}
      </section>

      {hasNextPage && <div ref={observerRef} className={s.observer} />}

      {!hasNextPage && posts.length > 0 && (
        <p className={s.endMessage}>{t('allPostsLoaded')}</p>
      )}
    </>
  );
}
