import { FC } from 'react';

import styles from './loader.module.scss';

const Loader: FC = () => (
  <div className={styles.loaderWrapper}>
    <div className={styles.loader}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
