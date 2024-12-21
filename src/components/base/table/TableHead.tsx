import { CSSProperties } from 'react';

import { TableHeadClassNames, TableHeadItem, TableHeadItems } from './TableTypes';
import styles from './table.module.scss';

type TableHeadProps<Head extends readonly TableHeadItem[]> = {
  head: readonly [...Head];
  classNames: TableHeadClassNames;
};

export default function TableHead<Head extends TableHeadItems>(props: TableHeadProps<Head>) {
  const { head, classNames } = props;
  const { head: headClassName = '', headRow = '', headCell = '' } = classNames;

  return (
    <div className={`${styles.table__head} ${headClassName}`}>
      <div className={`${styles.table__head_row} ${styles.table__row} ${headRow}`}>
        {head.map((cell, index) => {
          if (typeof cell === 'string') {
            return (
              <div key={index} className={`${styles.table__cell} ${headCell}`}>
                <span>{cell}</span>
              </div>
            );
          }

          if (typeof cell === 'object' && cell !== null && 'content' in cell) {
            const { content, props } = cell;

            return (
              <div
                key={index}
                style={
                  {
                    '--cell-align': props?.align || 'left',
                  } as CSSProperties
                }
                className={`${styles.table__cell} ${props?.className ? props?.className : ''} ${headCell}`}
              >
                {typeof content === 'string' ? <span>{content}</span> : content}
              </div>
            );
          }

          return (
            <div key={index} className={`${styles.table__cell} ${headCell}`}>
              {cell}
            </div>
          );
        })}
      </div>
    </div>
  );
}
