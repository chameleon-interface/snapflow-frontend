'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import { useMe } from '@/entities/user';
import s from './ProfilePage.module.css';
import { useProfilePostsInfinite } from '../api/useProfilePostsInfinite';

type Props = {
  profileId: number;
};

export function ProfilePosts({ profileId }: Props) {
  const t = useTranslations('Pages');
  const { data: me } = useMe();
  const isOwner = me?.userId === String(profileId);
  const { posts, observerRef, hasNextPage, isPending } =
    useProfilePostsInfinite(profileId);

  return (
    <>
      <section className={s.posts}>
        {!isPending && posts.length === 0 && (
          <div className={s.emptyWrapper}>
            <p className={s.noPosts}>
              {isOwner ? t('noPostsOwn') : t('noPostsGuest')}
            </p>
          </div>
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
