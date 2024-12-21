import clsx from 'clsx';
import { useRef, useState } from 'react';

import { useModal } from '@/hooks/useModal';

import Modal from '@components/base/modal/Modal';

import { ReactComponent as FilterIcon } from '@icons/setting4.svg';

import FiltersDropdown, { FiltersDropdownProps } from './FiltersDropdown';
import styles from './filters.module.scss';

type FiltersProps = Pick<
  FiltersDropdownProps,
  'isModal' | 'directions' | 'statuses' | 'onDirecion' | 'onStatus' | 'onReset'
>;

export default function Filters(props: FiltersProps) {
  const { isModal, directions, statuses, onDirecion, ...rest } = props;
  const { onStatus, onReset } = rest;
  const [open, toogleModal] = useModal();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const refButton = useRef<HTMLLabelElement | null>(null);

  const isFilter =
    directions.some(({ checked }) => checked) || statuses.some(({ checked }) => checked);

  const handleOpen = () => {
    if (isModal) return toogleModal();
    setIsOpenDropdown(true);
  };

  const handleClose = () => {
    if (isModal) return toogleModal();
    setIsOpenDropdown(false);
  };

  return (
    <label
      className={clsx(styles.label, {
        [styles.open]: isOpenDropdown,
      })}
      ref={refButton}
    >
      <button
        type="button"
        className={clsx(styles.button, {
          [styles.active]: isFilter,
        })}
        tabIndex={0}
        onClick={handleOpen}
      >
        <FilterIcon />
      </button>
      {isModal ? (
        <Modal open={open} handleClose={toogleModal} maxWidth={'max-content'}>
          <FiltersDropdown
            isModal
            directions={directions}
            statuses={statuses}
            onDirecion={onDirecion}
            onStatus={onStatus}
            onReset={onReset}
            onClose={handleClose}
          />
        </Modal>
      ) : (
        <FiltersDropdown
          directions={directions}
          statuses={statuses}
          onDirecion={onDirecion}
          onStatus={onStatus}
          onReset={onReset}
          onClose={handleClose}
        />
      )}
    </label>
  );
}
