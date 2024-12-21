import clsx from 'clsx';
import { useState } from 'react';

import { ReactComponent as ArrowDown } from '@icons/arrowDown.svg';
import { ReactComponent as ArrowUp } from '@icons/arrowUp.svg';

import BaseTextInput from '../../text-input/BaseTextInput';
import styles from '../base-datepicker.module.scss';

type SelectOption = {
  key: number;
  value: number | string;
  disabled?: boolean;
};

type DatePickerSelectProps = {
  options: SelectOption[];
  checkedKey?: SelectOption['key'];
  onChecked?: (option: SelectOption) => void;
};

export default function DatePickerSelect(props: DatePickerSelectProps) {
  const { options, checkedKey, onChecked } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.select}>
      <BaseTextInput
        type="button"
        height="sm"
        padding="sm"
        radius="sm"
        maxWidth="full"
        gap="none"
        value={options.find(({ key }) => key === checkedKey)?.value || options[0].value}
        IconEnd={{
          icon: isOpen ? <ArrowUp /> : <ArrowDown />,
          size: 'sm',
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        tabIndex={1}
        fontStyle="captions-text-medium"
      />
      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            {options.map(({ key, value, disabled }) => (
              <li
                className={clsx({
                  [styles.checked]: checkedKey === key,
                  [styles.disabled]: disabled,
                })}
                key={key}
                aria-disabled={disabled}
                onMouseDown={() => !disabled && onChecked?.({ key, value })}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
