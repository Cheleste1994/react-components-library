import { useQuery } from '@tanstack/react-query';
import {
  CSSProperties,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useOutlet } from 'react-router-dom';

import { useDinamicResize } from '@/hooks/useDinamicResize';
import { useFilter } from '@/hooks/useFilter';
import { TabletContext } from '@/store/contexts/TabletContext';

import { FlagCodes } from '@components/base/flag/flagCodes';
import Pagination from '@components/base/pagination/Pagination';
import { Direction, StatusesData } from '@components/custom/filters/FiltersDropdown';

import { Post, UserInfo, getDirections, getPosts, getUserList } from '@api/index';

import UserCard from './components/UserCard';
import UserTable from './components/UserTable';
import UsersFilter from './components/UsersFilter';
import styles from './style.module.scss';

export type DataUser = UserInfo & { posts: Post[] };
const PAGE_SIZE = 1;

export default function UserTablePage() {
  const isTablet = useContext(TabletContext);

  const [searchState, setSearchState] = useFilter();

  const { isLoading: isLoadingPosts, data: dataPosts = [] } = useQuery({
    queryKey: ['get_posts'],
    queryFn: () => getPosts(),
  });

  const {
    isLoading: isLoadingUsers,
    data: dataUsers = [],
    isFetched,
  } = useQuery({
    queryKey: ['get_users'],
    queryFn: () => getUserList(),
  });

  const { data: dataDirections = [] } = useQuery({
    queryKey: ['get_directions'],
    queryFn: () => getDirections(),
  });

  const [pagesAmount, setPagesAmount] = useState<number>(searchState.currentPage);

  const data: DataUser[] = useMemo(() => {
    const posts = dataPosts.reduce(
      (acc, cur) => ({ ...acc, [cur.userId]: acc[cur.userId] ? [...acc[cur.userId], cur] : [cur] }),
      {} as { [key: number]: Post[] }
    );

    return dataUsers.map((user) => ({ ...user, posts: posts[user.id] || [] }));
  }, [dataPosts, dataUsers]);

  const dataDeferred = useDeferredValue(data);

  const cities = useMemo(
    () =>
      Object.keys(
        dataUsers?.reduce((acc, cur) => ({ ...acc, [cur.address.city]: cur.address.city }), {})
      ),
    [dataUsers]
  );

  const directions: Direction[] = useMemo(
    () =>
      dataDirections.map(({ countryCode, countryName }) => ({
        countryCode: countryCode as FlagCodes,
        countryName,
        checked: Boolean(searchState.currentRoute?.find((r) => r === countryCode)),
      })),
    [searchState.currentRoute, dataDirections]
  );

  const statuses: StatusesData[] = useMemo(
    () =>
      cities.map((city) => ({
        statusCode: city,
        statusTitle: city,
        checked: Boolean(searchState.currentStatus?.find((r) => r === city)),
      })),
    [searchState.currentStatus, cities]
  );

  useEffect(() => {
    if (data) {
      setPagesAmount(Math.ceil(data.length / PAGE_SIZE) || 1);
    }
  }, [data]);

  const Outlet = useOutlet();
  const mainRef = useRef<HTMLElement | null>(null);

  const [resize, setStateResize] = useDinamicResize(mainRef, !isTablet);

  if (Outlet) return Outlet;

  const handleClickBorder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: 'left' | 'right'
  ) => {
    if (e.type === 'mousedown') {
      setStateResize({ isActive: true, direction });
    } else {
      setStateResize((s) => ({ ...s, isActive: false }));
    }
  };

  return (
    <main
      className={styles.page}
      ref={mainRef}
      style={
        {
          '--page-width': `${resize}px`,
        } as CSSProperties
      }
    >
      <h2 className={styles.title}>Пользователи</h2>

      <UsersFilter
        directions={directions}
        statuses={statuses}
        isFIlterModal={isTablet}
        setState={setSearchState}
        state={searchState}
      />

      <div>
        {!isTablet ? (
          <UserTable
            data={dataDeferred}
            isFetched={isFetched}
            isLoading={isLoadingPosts || isLoadingUsers}
          />
        ) : (
          <div>
            {data.map((user) => (
              <UserCard {...user} key={user.id} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        size={pagesAmount}
        currentPage={searchState.currentPage}
        setCurrentPage={setSearchState.handlePagination}
      />
      {!isTablet && (
        <div className={styles.border}>
          <button
            type="button"
            className={styles.border__left}
            onMouseDown={(e) => handleClickBorder(e, 'left')}
            onMouseUp={(e) => handleClickBorder(e, 'left')}
          ></button>
          <button
            type="button"
            className={styles.border__right}
            onMouseDown={(e) => handleClickBorder(e, 'right')}
            onMouseUp={(e) => handleClickBorder(e, 'right')}
          ></button>
        </div>
      )}
    </main>
  );
}
