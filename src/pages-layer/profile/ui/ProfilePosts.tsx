'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import s from './ProfilePage.module.css';
import { useProfilePostsInfinite } from './useProfilePostsInfinite';

type Props = {
  profileId: number;
};

export function ProfilePosts({ profileId }: Props) {
  const t = useTranslations('Pages');
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useProfilePostsInfinite(profileId);

  useEffect(() => {
    const node = observerRef.current;

    if (!node || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <section className={s.posts}>
        {!isPending && posts.length === 0 && (
          <p className={s.noPosts}>{t('noPosts')}</p>
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
