'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import { PostCardPreview } from '@/entities/post';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import type { PostViewDto } from '@/shared/api/generated/model';
import { ROUTES } from '@/shared/config/routes';
import { usePostByIdQuery } from '@/widgets/PostModal/api/usePostByIdQuery';
import { EmptyStateMessage } from '@/shared/ui';
import s from './ProfilePage.module.css';
import { useProfilePostsInfinite } from '../api/useProfilePostsInfinite';

const PostModal = dynamic(
  () => import('@/widgets/PostModal').then((mod) => mod.PostModal),
  { ssr: false },
);

type Props = {
  from?: string | null;
  profileId: string;
  postsCount: number;
  postId?: string | null;
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

export function ProfilePosts({ from, profileId, postsCount, postId }: Props) {
  const t = useTranslations('Pages');
  const tMainPage = useTranslations('MainPage');
  const router = useRouter();
  const { data: me } = useMe();
  const { posts, observerRef, hasNextPage, isPending, isError, refetch } =
    useProfilePostsInfinite(profileId);
  const initialPost =
    posts.find((post) => post.id === (postId ?? null)) ?? null;
  const closePostModal = () => {
    router.push(from === 'main' ? ROUTES.HOME : ROUTES.PROFILE(profileId), {
      scroll: false,
    });
  };
  const { data: selectedPostData } = usePostByIdQuery({
    postId: postId ?? null,
    initialPost,
  });

  const handlePostKeyDown =
    (post: PostViewDto) => (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        router.push(`${ROUTES.PROFILE(profileId)}?postId=${post.id}`, {
          scroll: false,
        });
      }
    };

  const handlePostClick =
    (post: PostViewDto) => (event: MouseEvent<HTMLElement>) => {
      if (isNestedInteractiveTarget(event.target, event.currentTarget)) {
        return;
      }

      router.push(`${ROUTES.PROFILE(profileId)}?postId=${post.id}`, {
        scroll: false,
      });
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
          <div
            key={post.id}
            className={s.post}
            role="button"
            tabIndex={0}
            aria-label={`Open post ${post.id}`}
            onClick={handlePostClick(post)}
            onKeyDown={handlePostKeyDown(post)}
          >
            <PostCardPreview post={post} variant="compact" />
          </div>
        ))}
      </section>

      {hasNextPage && <div ref={observerRef} className={s.observer} />}

      {!hasNextPage && posts.length > 0 && (
        <p className={s.endMessage}>{t('allPostsLoaded')}</p>
      )}

      {selectedPostData ? (
        <PostModal
          open
          post={selectedPostData}
          isOwner={me?.userId === selectedPostData.owner.ownerId}
          onCloseAction={closePostModal}
        />
      ) : null}
    </>
  );
}
