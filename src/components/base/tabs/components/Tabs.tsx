import { Children, PropsWithChildren } from 'react';

import styles from './tabs.module.scss';

export default function Tabs({ children }: PropsWithChildren) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} role="tablist">
        {Children.map(children, (child) => child)}
      </div>
    </div>
  );
}
