import { DataUser } from '..';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/store/redux/hooks';
import { getUser } from '@/store/redux/slice/user.slice';

import Table from '@components/base/table/Table';
import { DataNotFound } from '@components/custom/data-not-found/DataNotFound';

import { ReactComponent as ActionIcon } from '@icons/receiptSearch.svg';

import PostsModal from './PostsModal';

type UserTableProps = {
  data: DataUser[];
  isLoading: boolean;
  isFetched: boolean;
};

export default function UserTable({ data, isFetched, isLoading }: UserTableProps) {
  const { isAdminRole } = useAppSelector(getUser);

  return (
    <Table
      data={data}
      columnSizes={[150, 280, 280, 200, 100]}
      head={['Пользователь', 'Email', 'Телефон', 'Посты', 'Действие']}
      fixColumn={['auto', 'auto', 'auto', 'fix', 'auto']}
      renderRow={({ username, email, phone, posts }, indexRow) => [
        username,
        email,
        phone,
        <PostsModal posts={posts} username={username} key={`posts-${indexRow}`} />,
        <Link to={email} state={{ username, email, phone }} key={`link-${indexRow}`}>
          <ActionIcon width={16} height={16} />
        </Link>,
      ]}
      isLoading={isLoading}
      heightRows="max-content"
      headColor={isAdminRole ? 'primary' : 'secondary'}
      notFound={{
        content: <DataNotFound title="Пользователи не найдены" />,
        isActive: isFetched && !data.length,
      }}
    />
  );
}
