import { Link, useParams } from 'react-router-dom';

import Breadcrumbs from '@components/base/bread-crumbs/Breadcrumbs';

import styles from './styles.module.scss';

export default function HomeUserId() {
  const { userId } = useParams();

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs>
        <Link to={'../'}>Главная</Link>
        <Link to={'./'}>{userId}</Link>
      </Breadcrumbs>

      <h2>{userId}</h2>
    </div>
  );
}
