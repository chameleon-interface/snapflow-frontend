import { LogoutButton } from '@/features/auth';
import { NavMenu } from '../NavMenu/NavMenu';
import s from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <aside className={s.sidebar}>
      <NavMenu />
      <LogoutButton />
    </aside>
  );
};
