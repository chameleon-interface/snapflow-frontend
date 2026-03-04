'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import s from './ProfilePage.module.css';
import { useInfiniteScroll } from './useInfiniteScroll';
import { Post } from './types';

type Props = {
  profileId: number;
};

export function ProfilePosts({ profileId }: Props) {
  const t = useTranslations('Pages');
  const limit = 8;


  const fetchPosts = useCallback(
    async (page: number) => {
      const res = await fetch(
        `http://localhost:3001/posts?profileId=${profileId}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
      );

      if (!res.ok) {
        throw new Error('Failed to load posts');
      }

      const data: Post[] = await res.json();
      const total = Number(res.headers.get('X-Total-Count')) || 0;

      return { data, total };
    },
    [profileId, limit]
  );

  const {
    items: posts,
    hasMore,
    loading,
    observerRef,
  } = useInfiniteScroll<Post>(fetchPosts, limit);

  return (
    <>
      <section className={s.posts}>
        {posts.length === 0 && !loading && (
          <p className={s.noPosts}>{t('noPosts')}</p>
        )}

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