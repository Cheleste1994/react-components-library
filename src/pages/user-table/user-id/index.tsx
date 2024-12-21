import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@components/base/bread-crumbs/Breadcrumbs';

import styles from './style.module.scss';

export default function UserTableId() {
  const { userId } = useParams();
  const { state } = useLocation();

  if (state === null) return <Navigate to={'../'} />;

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>{`Пользователь ${state.username}`}</h2>

      <Breadcrumbs>
        <Link to={'../'}>Пользователи</Link>
        <Link to={'./'}>{userId}</Link>
      </Breadcrumbs>

      <ul>
        <li>{state.username}</li>
        <li>{state.email}</li>
        <li>{state.phone}</li>
      </ul>
    </main>
  );
}
