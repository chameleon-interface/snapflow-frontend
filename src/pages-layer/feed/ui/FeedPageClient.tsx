'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { type Post } from '@/entities/post';
import { PostModal } from '@/widgets/PostModal';
import styles from './FeedPageClient.module.css';

const demoPost: Post = {
  id: 1,
  description: 'Demo post description for edit and delete UI testing.',
  status: 'PUBLISHED',
  createdAt: '2026-03-22T00:00:00.000Z',
  postMedias: [
    {
      postMediaId: 1,
      fileId: 'demo-post-media-1',
      url: 'https://snapflow-storage.storage.yandexcloud.net/snapflow/media/posts/56/50a6476f-63a2-4446-8cd9-95be1a9f2bb8.jpeg',
    },
  ],
  owner: {
    ownerId: 1,
    username: 'UserName',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  },
};

export const FeedPageClient = () => {
  const t = useTranslations('Pages');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>(demoPost);

  return (
    <section className={styles.container}>
      <div className={styles.controls}>
        <p>{t('feedDemoStatus')}</p>
        <p>{t('feedDemoMockReady')}</p>

        <Button onClick={() => setIsOpen(true)}>{t('feedDemoOpen')}</Button>
      </div>

      {isOpen ? (
        <PostModal
          open={isOpen}
          post={selectedPost}
          isOwner
          onCloseAction={() => setIsOpen(false)}
          onPostUpdated={setSelectedPost}
          onPostDeleted={() => {
            setSelectedPost(demoPost);
            setIsOpen(false);
          }}
          forceOwnerActions
        />
      ) : null}
    </section>
  );
};
