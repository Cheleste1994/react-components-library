import { PropsWithChildren } from 'react';

import Header from './components/Header';
import styles from './style.module.scss';

export default function DesktopLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
