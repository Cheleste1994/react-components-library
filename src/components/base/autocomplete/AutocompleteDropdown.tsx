import clsx from 'clsx';
import { CSSProperties, useMemo } from 'react';

import { DropdownState } from '@/hooks/useDinamicDropdown';

import { type Option, type Options, TypeOptions } from './Autocomplete';
import BaseOption from './Option';
import styles from './autocomplete.module.scss';

type CheckedOption =
  | (Option & {
      options?: Option[];
    })
  | null;

type AutocompleteDropdownProps = {
  data: Options;
  type?: TypeOptions;
  onChecked?: (option: Omit<Option, 'Icon'> | null) => void;
  checkedOption: CheckedOption;
  notFound?: string;
  dropdownState: DropdownState;
  isActive: boolean;
  withPortal?: boolean;
};

export default function AutocompleteDropdown(props: AutocompleteDropdownProps) {
  const { data, type, onChecked, checkedOption, notFound, ...rest } = props;
  const { dropdownState, isActive, withPortal } = rest;

  const positionDropdown = useMemo(
    () =>
      dropdownState.refRect
        ? {
            '--position-left': dropdownState.refRect.left + 'px',
            '--position-width': dropdownState.refRect.width + 'px',
            '--position-top': dropdownState.refRect.top + 'px',
            '--position-height': dropdownState.refRect.height + 'px',
          }
        : null,
    [dropdownState]
  );

  return (
    <div
      className={clsx(styles.dropdown, styles[`align_${dropdownState.align}`], {
        [styles.active]: isActive,
        [styles.portal]: withPortal,
      })}
      style={
        {
          '--dropdown-height': dropdownState.height + 'px',
          ...positionDropdown,
        } as CSSProperties
      }
    >
      <div className={styles.dropdown__wrapper}>
        {!data[0]?.options ? (
          <ul className={styles.items}>
            {data.map((option) => (
              <BaseOption
                key={option.key}
                option={option}
                onMouseDown={() => {
                  onChecked?.(option);
                }}
                checked={option.key === checkedOption?.key}
                type={type}
              />
            ))}
          </ul>
        ) : (
          data.map((data) => (
            <ul key={data.key} className={styles.items}>
              <h3 className={styles.title}>{data.value}</h3>
              {data.options?.map((option) => (
                <BaseOption
                  key={option.key}
                  option={option}
                  onMouseDown={() => {
                    onChecked?.(option);
                  }}
                  checked={option.key === checkedOption?.key}
                  type={type}
                />
              ))}
            </ul>
          ))
        )}
        {!data.length && (
          <ul>
            <li className={styles.item}>{notFound}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
