import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '@components/base/bread-crumbs/Breadcrumbs';

import { getPost } from '@api/index';

import styles from './style.module.scss';

export default function TablePostId() {
  const { postId } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['get_posts', postId],
    queryFn: () => getPost(postId),
    enabled: Boolean(postId),
  });

  if (state === null) return <Navigate to={'../../'} />;

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>{`Посты пользователя ${state.username}`}</h2>

      <Breadcrumbs>
        <button onClick={() => navigate(-1)}>Пользователи</button>
        <Link to={'./'}>{`Пост ${postId}`}</Link>
      </Breadcrumbs>

      <ul>
        <li>Названия поста: {data?.title}</li>
        <li>Описание поста: {data?.body}</li>
      </ul>
    </main>
  );
}
