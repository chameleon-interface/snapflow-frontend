'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Post } from '@/entities/post';
import { useMe } from '@/entities/user';
import { EmptyStateMessage } from '@/shared/ui';
import { PostModal } from '@/widgets/PostModal';
import styles from './PostsBlock.module.css';
import { usePostsQuery } from '@/widgets/main-page/PostsBlock/api';
import { PostCard } from './PostCard';

export const PostsBlock = () => {
  const { data } = usePostsQuery();
  const { data: me } = useMe();
  const t = useTranslations('MainPage');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts = data?.items ?? [];
  const closePostModal = () => setSelectedPost(null);

  if (posts.length === 0) {
    return (
      <section className={styles.postsBlock}>
        <EmptyStateMessage>{t('noPostsYet')}</EmptyStateMessage>
      </section>
    );
  }
  return (
    <>
      <section className={styles.postsBlock}>
        {posts.map((post) => {
          return (
            <PostCard key={post.id} post={post} onOpen={setSelectedPost} />
          );
        })}
      </section>

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
};
