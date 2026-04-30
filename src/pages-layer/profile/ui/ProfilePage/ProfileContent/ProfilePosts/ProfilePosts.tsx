'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import { PostCardPreview } from '@/entities/post';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import type { PostViewDto } from '@/shared/api/generated/model';
import { isNestedInteractiveTarget } from '@/shared/lib/dom/isNestedInteractiveTarget';
import { usePostByIdQuery } from '@/widgets/PostModal/api/usePostByIdQuery';
import { EmptyStateMessage } from '@/shared/ui';
import { useProfilePostsInfinite } from '../../../../api/useProfilePostsInfinite';
import s from './ProfilePosts.module.css';
import { useProfilePostModalRoute } from './useProfilePostModalRoute';

const PostModal = dynamic(
  () => import('@/widgets/PostModal').then((mod) => mod.PostModal),
  { ssr: false },
);

type Props = {
  profileId: string;
  postsCount: number;
};

export function ProfilePosts({ profileId, postsCount }: Props) {
  const t = useTranslations('Pages');
  const tMainPage = useTranslations('MainPage');
  const { data: me } = useMe();
  const { closePost, openPost, postId } = useProfilePostModalRoute({
    profileId,
  });
  const { posts, observerRef, hasNextPage, isPending, isError, refetch } =
    useProfilePostsInfinite(me?.userId ?? '');
  const initialPost =
    posts.find((post) => post.id === (postId ?? null)) ?? null;
  const { data: selectedPostData } = usePostByIdQuery({
    postId: postId ?? null,
    initialPost,
  });

  const handlePostKeyDown =
    (post: PostViewDto) => (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPost(post.id);
      }
    };

  const handlePostClick =
    (post: PostViewDto) => (event: MouseEvent<HTMLElement>) => {
      if (isNestedInteractiveTarget(event.target, event.currentTarget)) {
        return;
      }

      openPost(post.id);
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

      {selectedPostData ? (
        <PostModal
          open
          post={selectedPostData}
          isOwner={me?.userId === selectedPostData.owner.userId}
          onCloseAction={closePost}
        />
      ) : null}
    </>
  );
}
