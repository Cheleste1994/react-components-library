import clsx from 'clsx';
import { Children, ReactNode, memo, useState } from 'react';

import TabWrapper from './components/TabWrapper';
import Tabs from './components/Tabs';
import styles from './tabs-container.module.scss';

type WrapperGap = 'sm' | 'md' | 'lg';

type TabTitles = readonly (ReactNode | string)[];

type TabsContainerProps<T extends TabTitles> = {
  tabTitles: [...T];
  children: { [K in keyof T]: ReactNode };
  gap?: WrapperGap;
  initialSlide?: number;
};

const TabsContainer = <T extends TabTitles>(props: TabsContainerProps<T>) => {
  const { children, tabTitles, gap = 'md', initialSlide = 0 } = props;

  const [currentTags, setCurrentTags] = useState(initialSlide);

  return (
    <div className={clsx(styles.wrapper, styles[`gap_${gap}`])}>
      <Tabs>
        {tabTitles.map((title, index) => (
          <TabWrapper
            key={index}
            checked={currentTags === index}
            onClick={() => setCurrentTags(index)}
          >
            {title}
          </TabWrapper>
        ))}
      </Tabs>
      <div className={styles.content}>
        {Children.map(children, (child, index) => (
          <div
            className={clsx(styles.slide, {
              [styles.checked]: index === currentTags,
            })}
            aria-hidden={index !== currentTags || undefined}
            role="tabpanel"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TabsContainer) as typeof TabsContainer;
