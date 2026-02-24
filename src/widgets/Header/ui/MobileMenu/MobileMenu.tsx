'use client';

import { useState } from 'react';
import { DropdownMenu } from 'snapflow-ui-kit/client';
import { MoreHozitontalIcon } from 'snapflow-ui-kit/icons';
import { Button } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import { useMe } from '@/entities/user';
import { useMenuItems } from '../../model';
import { LogoutModal, useLogoutMutation } from '@/features/auth/logout';
import s from './MobileMenu.module.css';

export const MobileMenu = () => {
  const t = useTranslations('Nav');
  const { data } = useMe();
  const { mutate } = useLogoutMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { authMenuItems, userMenuItems } = useMenuItems(() =>
    setIsModalOpen(true),
  );

  const menuItems = data ? userMenuItems : authMenuItems;

  return (
    <>
      <DropdownMenu items={menuItems} align="end" className={s.menu}>
        <Button
          variant="text"
          icon={<MoreHozitontalIcon />}
          className={s.menuButton}
          aria-label={t('profileSettings')}
          title={t('profileSettings')}
        />
      </DropdownMenu>

      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={mutate}
      />
    </>
  );
};
