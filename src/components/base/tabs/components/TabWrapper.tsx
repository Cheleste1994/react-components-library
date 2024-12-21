import { clsx } from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import styles from './tab.module.scss';

export interface TabWrapperProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
}

export default function TabWrapper(props: PropsWithChildren<TabWrapperProps>) {
  const { checked, children, ...rest } = props;

  return (
    <button
      type="button"
      role="tab"
      className={clsx(styles.tab__wrapper, {
        [styles.active]: checked,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
