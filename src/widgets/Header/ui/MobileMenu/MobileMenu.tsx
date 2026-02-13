'use client';

import { DropdownMenu } from 'snapflow-ui-kit/client';
import { MoreHozitontalIcon } from 'snapflow-ui-kit/icons';
import { Button } from 'snapflow-ui-kit';
import { useMe } from '@/shared/api/useMe';
import { useMenuItems } from '../../model';
import s from './MobileMenu.module.css';

export const MobileMenu = () => {
  const { data } = useMe();
  const { authMenuItems, userMenuItems } = useMenuItems();

  const menuItems = data ? userMenuItems : authMenuItems;

  return (
    <DropdownMenu items={menuItems} align="end" className={s.menu}>
      <Button
        variant="text"
        icon={<MoreHozitontalIcon />}
        className={s.menuButton}
      />
    </DropdownMenu>
  );
};
