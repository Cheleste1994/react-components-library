import clsx from 'clsx';
import { useMemo } from 'react';

import styles from './Pagination.module.scss';

interface PaginationProps {
  size: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, setCurrentPage, size } = props;

  const initialState = useMemo(() => {
    const sizeArray = size > 1 ? new Array(size).fill(1).map((_, i) => i + 1) : [1];

    const getButton = (page: number) => {
      switch (page) {
        case currentPage:
        case 1:
        case size:
        case currentPage - 1:
        case currentPage + 1:
          return (
            <li
              key={page}
              className={clsx({
                [styles.current]: page === currentPage,
              })}
            >
              <button type="button" onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            </li>
          );
        case currentPage - 2:
        case currentPage + 2:
          return (
            <li key={`dots-${page}`}>
              <button type="button">...</button>
            </li>
          );
        default:
          return null;
      }
    };

    return sizeArray.map((page) =>
      size <= 5 ? (
        <li
          key={page}
          className={clsx({
            [styles.current]: page === currentPage,
          })}
        >
          <button type="button" onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        </li>
      ) : (
        getButton(page)
      )
    );
  }, [currentPage, setCurrentPage, size]);

  const itemsMemo = useMemo(() => {
    const items = [...initialState].filter((i) => i);

    if (items.length < 5 && size > 5) {
      if (initialState[initialState.length - 2] === null) {
        items.splice(
          items.length - 1,
          0,
          <li key={initialState.length - 2}>
            <button type="button" onClick={() => setCurrentPage(initialState.length - 1)}>
              {initialState.length - 1}
            </button>
          </li>
        );
      }
      if (initialState[1] === null) {
        items.splice(
          1,
          0,
          <li key={2}>
            <button type="button" onClick={() => setCurrentPage(2)}>
              {2}
            </button>
          </li>
        );
      }
    }

    return items;
  }, [initialState, setCurrentPage]);

  return (
    <nav className={styles.wrapper} aria-label="pagination">
      <ul>{itemsMemo}</ul>
    </nav>
  );
}
