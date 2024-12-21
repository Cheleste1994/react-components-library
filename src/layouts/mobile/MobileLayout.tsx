import { PropsWithChildren } from 'react';

import AppMenu from '../desktop/components/AppMenu';
import Header from '../desktop/components/Header';

import styles from './style.module.scss';

const MobileLayout = ({ children }: PropsWithChildren) => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.content}>{children}</div>
    <div className={styles.nav}>
      <AppMenu />
    </div>
  </div>
);

export default MobileLayout;
