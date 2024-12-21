import { FC } from 'react';

import styles from './data-not-found.module.scss';

interface DataNotFoundProps {
  title: string;
  description?: string;
  Icon?: React.ReactNode;
}

export const DataNotFound: FC<DataNotFoundProps> = ({ title, description, Icon }) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      {Icon}
      <div>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  </div>
);
