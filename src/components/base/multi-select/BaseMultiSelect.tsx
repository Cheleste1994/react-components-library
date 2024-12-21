import clsx from 'clsx';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import { useDynamicDropdown } from '@/hooks/useDinamicDropdown';

import { ReactComponent as ArrowDown } from '@icons/arrowDown.svg';

import BaseCheckbox from '../buttons/checkbox/BaseCheckbox';

import styles from './base-multi-select.module.scss';

type InputHeight = 'sm' | 'md' | 'lg';
type InputMaxWidth = 'md' | 'full';
type TextAlign = 'center' | 'left' | 'right';

export interface MultiSelectOption<T extends string | number = string> {
  key: T;
  value: string;
  selectedValue?: string;
}

export interface MultiSelectProps<T = MultiSelectOption['key']> {
  title?: string;
  options: MultiSelectOption[];
  onChange?: (item: MultiSelectOption[]) => void;
  checkedKeys?: T[];
  height?: InputHeight;
  maxWidth?: InputMaxWidth;
  textAlign?: TextAlign;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export default function BaseMultiSelect(props: MultiSelectProps) {
  const { title, options, checkedKeys, onChange, height, maxWidth, ...rest } = props;
  const { textAlign, disabled, error, inputProps, placeholder } = rest;

  const refLabel = useRef<HTMLLabelElement | null>(null);
  const dropdownState = useDynamicDropdown(refLabel);

  const [searchItem, setSearchItem] = useState<Map<string | number, MultiSelectOption>>(new Map());

  useEffect(() => {
    setSearchItem(
      new Map(
        options.filter(({ key }) => checkedKeys?.includes(key)).map((item) => [item.key, item])
      )
    );
  }, [checkedKeys]);

  const handleClickButton = (item: MultiSelectOption) => {
    const newState = new Map(searchItem);
    if (newState.has(item.key)) {
      newState.delete(item.key);
    } else {
      newState.set(item.key, item);
    }
    onChange?.([...newState.values()]);
  };

  const itemsCheckedValue = useCallback(() => {
    return [...searchItem.values()]
      .map(({ selectedValue, value }) => selectedValue || value)
      .join(', ');
  }, [searchItem]);

  return (
    <label
      className={clsx(styles.label, styles[`height_${height}`], styles[`max-width_${maxWidth}`], {
        [styles.title]: Boolean(title),
        [styles.error]: error,
      })}
      data-title={title}
      aria-label={title}
      style={
        {
          '--input-text-align': textAlign,
          '--dropdown-height': dropdownState.height + 'px',
        } as CSSProperties
      }
      ref={refLabel}
      tabIndex={0}
    >
      <input
        readOnly
        value={itemsCheckedValue()}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
      />
      <div className={styles.icon__end}>
        <ArrowDown className={styles.icon__end_arrow} />
      </div>

      <div
        className={clsx(styles.dropdown, styles[`align_${dropdownState.align}`], {
          [styles.active]: options.length,
        })}
      >
        <div className={styles.dropdown__wrapper}>
          <ul>
            {options.map((item) => (
              <li key={item.key} className={styles.item}>
                <BaseCheckbox
                  checked={checkedKeys?.includes(item.key)}
                  onChange={() => handleClickButton(item)}
                  tabIndex={1}
                  maxWidth="full"
                  classNames={{
                    label: clsx(styles.item__checkbox, {
                      [styles.checked]: checkedKeys?.includes(item.key),
                    }),
                  }}
                >
                  {item.value}
                </BaseCheckbox>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </label>
  );
}
