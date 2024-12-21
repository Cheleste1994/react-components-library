import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { TextValue, useText } from '@/hooks/useText';
import { useAppSelector } from '@/store/redux/hooks';
import { getUser } from '@/store/redux/slice/user.slice';
import { UserRoleEnum } from '@/types/user.ts';

import { ReactComponent as HomeIcon } from '@icons/home.svg';
import { ReactComponent as TableIcon } from '@icons/table.svg';

import styles from './app-menu.module.scss';

interface MenuItem {
  title: keyof TextValue<'LAYOUT_CONTENT'>;
  path: string;
  icon: React.FunctionComponent;
  requiredRole: UserRoleEnum[];
}

type Menu = { [key in UserRoleEnum]: MenuItem[] };

const menus: Menu = {
  [UserRoleEnum.User]: [
    {
      title: 'NAV_HOME',
      icon: HomeIcon,
      path: DASHBOARD_PAGES.HOME.path,
      requiredRole: DASHBOARD_PAGES.HOME.requiredRole,
    },
    {
      title: 'NAV_TABLE',
      icon: TableIcon,
      path: DASHBOARD_PAGES.USER_TABLE.path,
      requiredRole: DASHBOARD_PAGES.USER_TABLE.requiredRole,
    },
  ],

  [UserRoleEnum.Manager]: [
    {
      title: 'NAV_HOME',
      icon: HomeIcon,
      path: DASHBOARD_PAGES.HOME.path,
      requiredRole: DASHBOARD_PAGES.HOME.requiredRole,
    },
    {
      title: 'NAV_TABLE',
      icon: TableIcon,
      path: DASHBOARD_PAGES.USER_TABLE.path,
      requiredRole: DASHBOARD_PAGES.USER_TABLE.requiredRole,
    },
  ],

  [UserRoleEnum.Admin]: [
    {
      title: 'NAV_HOME',
      icon: HomeIcon,
      path: DASHBOARD_PAGES.HOME.path,
      requiredRole: DASHBOARD_PAGES.HOME.requiredRole,
    },
    {
      title: 'NAV_TABLE',
      icon: TableIcon,
      path: DASHBOARD_PAGES.USER_TABLE.path,
      requiredRole: DASHBOARD_PAGES.USER_TABLE.requiredRole,
    },
  ],
};

const AppMenu: FC = () => {
  const { user } = useAppSelector(getUser);
  const T = useText('LAYOUT_CONTENT');
  const userRole = user?.roles.find((role) => Array.isArray(menus[role]));

  return (
    <nav className={styles.menu}>
      <ul>
        {userRole &&
          menus[userRole].map(
            ({ icon: Icon, path, requiredRole, title }: MenuItem, index) =>
              user?.roles.some((role) => requiredRole.includes(role)) && (
                <NavLink
                  to={path}
                  key={path + index}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  <li data-title={T[title]}>
                    <Icon />
                  </li>
                </NavLink>
              )
          )}
      </ul>
    </nav>
  );
};

export default AppMenu;
