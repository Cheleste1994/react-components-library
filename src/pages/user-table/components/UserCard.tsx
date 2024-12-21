import { DataUser } from '..';
import { Link } from 'react-router-dom';

import { ReactComponent as ActionIcon } from '@icons/receiptSearch.svg';

import PostsModal from './PostsModal';

type UserCardProps = DataUser;

export default function UserCard(props: UserCardProps) {
  const { email, username, phone, website, posts } = props;
  return (
    <ul>
      <li>{email}</li>
      <li>{username}</li>
      <li>{phone}</li>
      <li>{website}</li>
      <li>
        <PostsModal posts={posts} username={username} />
      </li>
      <li>
        <Link to={email} state={{ username, email, phone }}>
          <ActionIcon width={16} height={16} />
        </Link>
      </li>
    </ul>
  );
}
