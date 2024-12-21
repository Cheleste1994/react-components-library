import clsx from 'clsx';
import { CSSProperties, Fragment, useDeferredValue } from 'react';

import Loader from '../loader/Loader';

import TableHead from './TableHead';
import TableRows from './TableRows';
import {
  ColumnSizes,
  FixColumn,
  NotFoundProps,
  RenderRow,
  ScreenSizes,
  TableClassNames,
  TableHeadItem,
  TableHeadItems,
} from './TableTypes';
import styles from './table.module.scss';

type HeadColor = 'primary' | 'secondary';

type TableProps<T, Head extends readonly TableHeadItem[]> = {
  head: readonly [...Head];
  headColor?: HeadColor;
  data: T[];
  fixColumn?: FixColumn<Head>;
  renderRow: (data: T, indexRow: number) => RenderRow<Head>;
  isLoading?: boolean;
  notFound?: NotFoundProps | NotFoundProps[];
  columnSizes?: ColumnSizes<Head>;
  classNames?: TableClassNames;
  heightRows?: 'max-content' | 'string';
};

export default function Table<T extends { id: string | number }, Head extends TableHeadItems>(
  props: TableProps<T, Head>
) {
  const { head, renderRow, data = [], isLoading, notFound, ...rest } = props;
  const { columnSizes, classNames, fixColumn, headColor = 'primary', heightRows } = rest;

  const deferredData = useDeferredValue(data);

  const handleColumnSize = (screen?: ScreenSizes, scrollSize = 0) => {
    const getSizes = (sizes: number[]) =>
      sizes
        .map((c, i, a) => {
          const isFixColumn = Array.isArray(fixColumn)
            ? fixColumn?.[i] === 'fix'
            : fixColumn && screen && fixColumn[`${screen}`][i] === 'fix';
          const unit = isFixColumn ? 'px' : 'fr';
          const divider = isFixColumn ? 1 : 10;

          return `${a.length - 1 === i ? (c - scrollSize) / divider : c / divider}${unit}`;
        })
        .join(' ');

    if (columnSizes && Array.isArray(columnSizes)) {
      return getSizes(columnSizes);
    } else if (columnSizes && screen) {
      return getSizes(columnSizes[screen]);
    }
    return `repeat(${head.length}, 1fr)`;
  };

  const variables = {
    '--column-size': handleColumnSize(1920),
    '--column-size-1440': handleColumnSize(1440),
    '--column-size-1280': handleColumnSize(1280),
  } as CSSProperties;

  return (
    <div
      className={clsx(styles.table, classNames?.table, styles[headColor], {
        [styles.loading]: isLoading,
      })}
      style={
        {
          ...variables,
          '--height-rows': heightRows,
        } as CSSProperties
      }
    >
      <TableHead
        head={head}
        classNames={{
          head: classNames?.head,
          headCell: classNames?.headCell,
          headRow: classNames?.headRow,
        }}
      />

      <div
        className={clsx(styles.table__body, classNames?.body, {
          [styles.loading]: isLoading,
        })}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <TableRows
            data={deferredData}
            renderRow={renderRow}
            classNames={{
              bodyCell: classNames?.bodyCell,
              bodyRow: classNames?.bodyRow,
            }}
          />
        )}

        {Array.isArray(notFound) &&
          notFound.map(({ content, isActive }, index) =>
            isActive ? <Fragment key={`${index}`}>{content}</Fragment> : <Fragment key={index} />
          )}

        {!Array.isArray(notFound) && notFound?.isActive && (
          <div className={styles.notFound}>{notFound.content}</div>
        )}
      </div>
    </div>
  );
}
