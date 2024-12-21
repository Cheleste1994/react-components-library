import clsx from 'clsx';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

import { TabletContext } from '@/store/contexts/TabletContext';
import { useAppDispatch, useAppSelector } from '@/store/redux/hooks';
import { getUser, loginUser, setTheme } from '@/store/redux/slice/user.slice';
import { UserRoleEnum } from '@/types/user';

import Autocomplete from '@components/base/autocomplete/Autocomplete';

import { ReactComponent as ThemeIcon } from '@icons/theme.svg';
import { ReactComponent as ThemeDarkIcon } from '@icons/themeDark.svg';

import AppMenu from './AppMenu';
import styles from './header.module.scss';

export const Header: FC = () => {
  const isTablet = useContext(TabletContext);

  const { user, theme } = useAppSelector(getUser);

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const checkIsScroll = () => setIsScroll(window.scrollY > 10);

    checkIsScroll();

    window.addEventListener('scroll', checkIsScroll);

    return () => {
      window.removeEventListener('scroll', checkIsScroll);
    };
  }, []);

  const checkedRole = useMemo(
    () =>
      user?.roles.find(
        (e) => e === UserRoleEnum.User || e === UserRoleEnum.Manager || e === UserRoleEnum.Admin
      ) || '',
    [user?.roles]
  );

  const dispatch = useAppDispatch();

  const handleChangeRole = (role?: UserRoleEnum) => {
    dispatch(loginUser(role));
  };

  return (
    <header
      className={clsx(styles.header, {
        [styles.scrollable]: isScroll,
      })}
    >
      <div className={styles.control}>
        <button
          type="button"
          className={styles.control__theme}
          onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? <ThemeDarkIcon /> : <ThemeIcon />}
        </button>
        <Autocomplete
          type="radio"
          maxWidth="md"
          height="md"
          inputProps={{ readOnly: true }}
          onChecked={(o) => handleChangeRole(o?.key as UserRoleEnum)}
          checkedKey={checkedRole}
          options={[
            { key: UserRoleEnum.User, value: 'Пользователь' },
            { key: UserRoleEnum.Manager, value: 'Мэнеджер' },
            { key: UserRoleEnum.Admin, value: 'Администратор' },
          ]}
        />
      </div>
      {!isTablet && <AppMenu />}
    </header>
  );
};

export default Header;
