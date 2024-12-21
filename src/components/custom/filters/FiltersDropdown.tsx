import clsx from 'clsx';

import BaseCheckbox from '@components/base/buttons/checkbox/BaseCheckbox';
import FlagIcon from '@components/base/flag/FlagIcon';
import { FlagCodes } from '@components/base/flag/flagCodes';

import { ReactComponent as CloseIcon } from '@icons/closeCircle.svg';

import styles from './filters.module.scss';

export type Direction = {
  countryCode: FlagCodes;
  countryName: string;
  checked: boolean;
};

export type StatusesData = {
  checked: boolean;
  statusCode: string;
  statusTitle: string;
};

export type FiltersDropdownProps = {
  isModal?: boolean;
  directions: Direction[];
  statuses: StatusesData[];
  onDirecion?: (routeId: string) => void;
  onStatus?: (status: string) => void;
  onReset?: () => void;
  onClose?: () => void;
};

export default function FiltersDropdown(props: FiltersDropdownProps) {
  const { isModal, directions, statuses, onDirecion, onStatus, onClose, onReset } = props;

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.dropdown]: !isModal,
      })}
      tabIndex={1}
    >
      <div className={styles.title}>
        <h3>Фильтры</h3>
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.directions}>
          <h4>Страны</h4>
          <div className={styles.directions__content}>
            {directions.map(({ countryCode, countryName, checked }) => (
              <BaseCheckbox
                key={countryCode}
                checked={checked}
                onChange={() => onDirecion?.(countryCode)}
              >
                <FlagIcon code={countryCode} width={16} height={16} />
                {countryName}
              </BaseCheckbox>
            ))}
          </div>
        </div>

        <div className={styles.statuses}>
          <h4>Города</h4>
          <div className={styles.statuses__content}>
            {statuses.map(({ checked, statusCode, statusTitle }) => (
              <BaseCheckbox
                key={statusCode}
                checked={checked}
                onChange={() => onStatus?.(statusCode)}
              >
                {statusTitle}
              </BaseCheckbox>
            ))}
          </div>
        </div>
      </div>
      <button type="button" className={styles.reset} onClick={onReset}>
        Сбросить все
      </button>
    </div>
  );
}
