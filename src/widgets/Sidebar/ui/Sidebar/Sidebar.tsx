'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Typography } from 'snapflow-ui-kit';
import { LogoutButton } from '@/features/auth/logout';
import { NavMenu } from '../NavMenu/NavMenu';
import { BottomNav } from '../BottomNav';
import { CreatePostModal } from '@/features/post/create-post/ui';
import { ROUTES } from '@/shared/config';
import s from './Sidebar.module.css';
import { useMe } from '@/entities/user';

export const Sidebar = () => {
  const { data, isPending, isError } = useMe();
  const hasSidebar = !isPending && !isError && !!data;
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  useEffect(() => {
    if (hasSidebar) {
      document.body.dataset.hasSidebar = 'true';
      return () => {
        delete document.body.dataset.hasSidebar;
      };
    }

    delete document.body.dataset.hasSidebar;
  }, [hasSidebar]);

  if (!hasSidebar) {
    return null;
  }

  const handleOpenCreatePostModal = () => setIsCreatePostModalOpen(true);
  const handleCloseCreatePostModal = () => setIsCreatePostModalOpen(false);

  return (
    <>
      {/* Сайдбар (desktop) */}
      <aside className={`${s.sidebar} ${s.desktopOnly}`}>
        <Typography
          variant="large"
          className={s.brand}
          as={Link}
          href={ROUTES.HOME}
        >
          Snapflow
        </Typography>

        <div className={s.navSection}>
          <NavMenu
            profileId={data.profileId}
            onOpenCreatePostModal={handleOpenCreatePostModal}
            isCreatePostModalOpen={isCreatePostModalOpen}
          />
        </div>

        <div className={s.footer}>
          <LogoutButton />
        </div>
      </aside>

      {/* Нижняя навигация (mobile) */}
      <div className={s.mobileOnly}>
        <BottomNav
          profileId={data.profileId}
          onOpenCreatePostModal={handleOpenCreatePostModal}
          isCreatePostModalOpen={isCreatePostModalOpen}
        />
      </div>

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={handleCloseCreatePostModal}
      />
    </>
  );
};
