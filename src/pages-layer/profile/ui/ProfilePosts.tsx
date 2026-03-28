'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import s from './ProfilePage.module.css';
import { useInfiniteScroll } from './useInfiniteScroll';
import type { Post } from '../types/types';
import { getPosts } from '../api/posts.api';

type Props = {
  profileId: number;
};

export function ProfilePosts({ profileId }: Props) {
  const t = useTranslations('Pages');
  const limit = 8;

  const fetchPosts = useCallback(
    (page: number) => getPosts(page, limit, profileId),
    [profileId, limit],
  );

  const {
    items: posts,
    hasMore,
    observerRef,
  } = useInfiniteScroll<Post>(fetchPosts, limit);

  return (
    <>
      <section className={s.posts}>
        {posts.length === 0 && <p className={s.noPosts}>{t('noPosts')}</p>}

        {posts.map((post) => (
          <article key={post.id} className={s.post}>
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

      {hasMore && <div ref={observerRef} className={s.observer} />}

      {!hasMore && posts.length > 0 && (
        <p className={s.endMessage}>{t('allPostsLoaded')}</p>
      )}
    </>
  );
}
