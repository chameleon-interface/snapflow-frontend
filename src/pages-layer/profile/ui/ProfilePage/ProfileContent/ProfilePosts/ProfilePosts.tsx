'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, Carousel } from 'snapflow-ui-kit/client';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import { EmptyStateMessage } from '@/shared/ui';
import { useProfilePostsInfinite } from '../../../../api/useProfilePostsInfinite';
import s from './ProfilePosts.module.css';

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
          <article key={post.id} className={s.post}>
            {post.mediaCount > 1 && (
              <div className={s.multiMediaBadge}>
                <ImageIcon aria-hidden />
                <span>{post.mediaCount}</span>
              </div>
            )}
            <Carousel className={s.postCarousel}>
              {post.medias.map((media, index) => (
                <div key={media.id} className={s.postSlide}>
                  <Image
                    src={media.url}
                    alt={`Photo ${index + 1} of ${post.mediaCount} in post ${post.id}`}
                    fill
                    className={s.postImage}
                    sizes="(max-width: 600px) 150px, 234px"
                  />
                </div>
              ))}
            </Carousel>
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
