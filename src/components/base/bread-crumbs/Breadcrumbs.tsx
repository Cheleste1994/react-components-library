import { Children, PropsWithChildren } from 'react';

import { ReactComponent as ArrowIcon } from '@icons/arrowRight.svg';

import styles from './bread-crumbs.module.scss';

export default function Breadcrumbs(props: PropsWithChildren) {
  const { children } = props;

  const count = Children.count(children);

  return (
    <nav aria-label="breadcrumb" className={styles.wrapper}>
      <ol>
        {Children.map(children, (child, index) => (
          <li>
            {child}
            {count - 1 !== index && <ArrowIcon width={8} height={8} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
