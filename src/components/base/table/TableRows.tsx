import clsx from 'clsx';
import { CSSProperties } from 'react';

import { RenderRow, TableBodyClassNames, TableHeadItems } from './TableTypes';
import styles from './table.module.scss';

type TableRowsProps<T, Head extends TableHeadItems> = {
  data: T[];
  renderRow: (data: T, indexRow: number) => RenderRow<Head>;
  classNames: TableBodyClassNames;
};

export default function TableRows<T extends { id: string | number }, Head extends TableHeadItems>(
  props: TableRowsProps<T, Head>
) {
  const { data, renderRow, classNames } = props;
  const { bodyRow = '', bodyCell = '' } = classNames;

  return (
    <>
      {data.map((d, indexRow) => {
        const cells = renderRow(d, indexRow);
        return (
          <div key={d.id} className={clsx(styles.table__body_row, styles.table__row, bodyRow)}>
            {cells.map((cell, indexCell) => {
              if (typeof cell === 'string') {
                return (
                  <div
                    key={`${indexRow}-${indexCell}`}
                    className={clsx(styles.table__body_cell, styles.table__cell, bodyCell)}
                  >
                    <span>{cell}</span>
                  </div>
                );
              }

              if (typeof cell === 'object' && cell !== null && 'content' in cell) {
                const { content, props } = cell;

                return (
                  <div
                    key={`${indexRow}-${indexCell}`}
                    style={
                      {
                        '--cell-align': props?.align || 'left',
                      } as CSSProperties
                    }
                    className={clsx(
                      styles.table__body_cell,
                      styles.table__cell,
                      props?.className,
                      bodyCell
                    )}
                  >
                    {content}
                  </div>
                );
              }

              return (
                <div
                  key={`${indexRow}-${indexCell}`}
                  className={`${styles.table__cell} ${bodyCell}`}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
