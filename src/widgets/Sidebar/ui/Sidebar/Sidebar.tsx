'use client';

import { useEffect, useState } from 'react';
import { LogoutButton } from '@/features/auth/logout';
import { NavMenu } from '../NavMenu/NavMenu';
import { BottomNav } from '../BottomNav';
import { CreatePostModal } from '@/features/post/create-post/ui';
import s from './Sidebar.module.css';
import { useMe } from '@/entities/user';
import { SidebarSkeleton } from './SidebarSkeleton';

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

  if (isPending) {
    return (
      <aside className={`${s.sidebar} ${s.desktopOnly}`}>
        <SidebarSkeleton />
      </aside>
    );
  }

  if (!hasSidebar) {
    return null;
  }

  const handleOpenCreatePostModal = () => setIsCreatePostModalOpen(true);
  const handleCloseCreatePostModal = () => setIsCreatePostModalOpen(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`${s.sidebar} ${s.desktopOnly}`}>
        <NavMenu
          profileId={data.profileId}
          onOpenCreatePostModal={handleOpenCreatePostModal}
          isCreatePostModalOpen={isCreatePostModalOpen}
        />
        <LogoutButton />
      </aside>

      {/* Mobile Bottom Navigation */}
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
