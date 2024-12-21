import { FunctionComponent } from 'react';

import styles from './tab.module.scss';

type TabProps = {
  title?: string;
  EndIcon?: FunctionComponent;
  StartIcon?: FunctionComponent;
};

export default function Tab(props: TabProps) {
  const { title, StartIcon, EndIcon } = props;

  return (
    <div className={styles.tab}>
      {StartIcon && <StartIcon />}
      <span className={styles.tab__title}>{title}</span>
      {EndIcon && <EndIcon />}
    </div>
  );
}
