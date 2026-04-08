'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, Carousel } from 'snapflow-ui-kit/client';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import { useMe } from '@/entities/user';
import { PostModal } from '@/widgets/PostModal';
import type { Post } from '@/widgets/PostModal/ui/post.types';
import { EmptyStateMessage } from '@/shared/ui';
import s from './ProfilePage.module.css';
import { useProfilePostsInfinite } from '../api/useProfilePostsInfinite';

type Props = {
  profileId: string;
  postsCount: number;
};

const INTERACTIVE_TARGET_SELECTOR =
  'button, a, input, textarea, select, [role="button"]';

const isNestedInteractiveTarget = (
  target: EventTarget | null,
  currentTarget: EventTarget | null,
) => {
  return (
    target instanceof Element &&
    target.closest(INTERACTIVE_TARGET_SELECTOR) !== currentTarget
  );
};

export function ProfilePosts({ profileId, postsCount }: Props) {
  const t = useTranslations('Pages');
  const tMainPage = useTranslations('MainPage');
  const { data: me } = useMe();
  const { posts, observerRef, hasNextPage, isPending, isError, refetch } =
    useProfilePostsInfinite(profileId);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const closePostModal = () => setSelectedPost(null);

  const handlePostKeyDown =
    (post: Post) => (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setSelectedPost(post);
      }
    };

  const handlePostClick = (post: Post) => (event: MouseEvent<HTMLElement>) => {
    if (isNestedInteractiveTarget(event.target, event.currentTarget)) {
      return;
    }

    setSelectedPost(post);
  };

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
          <article
            key={post.id}
            className={s.post}
            role="button"
            tabIndex={0}
            aria-label={`Open post ${post.id}`}
            onClick={handlePostClick(post)}
            onKeyDown={handlePostKeyDown(post)}
          >
            {post.postMedias.length > 1 && (
              <div className={s.multiMediaBadge}>
                <ImageIcon aria-hidden />
                <span>{post.postMedias.length}</span>
              </div>
            )}
            <Carousel className={s.postCarousel}>
              {post.postMedias.map((media, index) => (
                <div key={media.postMediaId} className={s.postSlide}>
                  <Image
                    src={media.url}
                    alt={`Photo ${index + 1} of ${post.postMedias.length} in post ${post.id}`}
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

      {selectedPost ? (
        <PostModal
          open
          post={selectedPost}
          isOwner={me?.userId === selectedPost.owner.ownerId}
          onCloseAction={closePostModal}
          onPostUpdated={setSelectedPost}
          onPostDeleted={closePostModal}
        />
      ) : null}
    </>
  );
}
