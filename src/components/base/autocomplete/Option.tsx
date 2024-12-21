import clsx from 'clsx';

import { ReactComponent as TickCircle } from '@icons/tickCircle.svg';

import BaseRadioButton from '../buttons/radio-button/BaseRadioButton';

import { type Option, TypeOptions } from './Autocomplete';
import styles from './autocomplete.module.scss';

interface OptionProps
  extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  option: Option;
  checked?: boolean;
  type?: TypeOptions;
}

export default function Option(props: OptionProps) {
  const {
    option: { value, Icon },
    checked,
    type,
    ...liProps
  } = props;

  return (
    <li
      className={clsx(styles.item, {
        [styles.checked]: checked,
      })}
      {...liProps}
    >
      {type === 'radio' ? (
        <BaseRadioButton
          checked={checked}
          title={value}
          sizeRadio="md"
          onChange={(e) => e.preventDefault()}
        />
      ) : (
        <>
          {Icon && <span className={styles.item__icon}>{Icon}</span>}
          <span className={styles.item__title}>{value}</span>
          {checked && (
            <span className={styles.item__checked}>
              <TickCircle />
            </span>
          )}
        </>
      )}
    </li>
  );
}
