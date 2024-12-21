import clsx from 'clsx';
import { ru } from 'date-fns/locale/ru';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

import { ReactComponent as ArrowLeft } from '@icons/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '@icons/arrowRight.svg';

import styles from '../base-datepicker.module.scss';

import DatePickerSelect from './DatePickerSelect';

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface DatePickerHeader extends ReactDatePickerCustomHeaderProps {
  yearsAfterCurrentDate: number;
  yearsBeforeCurrentDate: number;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerHeader(props: DatePickerHeader) {
  const { date, changeMonth, changeYear, decreaseMonth, increaseMonth, ...rest } = props;
  const { yearsAfterCurrentDate, yearsBeforeCurrentDate, prevMonthButtonDisabled, ...r } = rest;
  const { nextMonthButtonDisabled, maxDate, minDate } = r;

  const currentYear = date.getFullYear();

  const maxYear = maxDate?.getFullYear();
  const maxMonth = maxDate?.getMonth();

  const minYear = minDate?.getFullYear();
  const minMonth = minDate?.getMonth();

  const isDisabledMaxMonth = (month: number) => {
    if (!maxYear || !maxMonth) return false;
    if (currentYear === maxYear && month > maxMonth) return true;
    if (currentYear > maxYear) return true;
  };

  const isDisabledMinMonth = (month: number) => {
    if (!minYear || !minMonth) return false;
    if (currentYear === minYear && month < minMonth) return true;
    if (currentYear < minYear) return true;
  };

  const isDisabledMaxYear = (year: number) => {
    if (!maxYear) return false;
    if (year > maxYear) return true;
  };

  const isDisabledMinYear = (year: number) => {
    if (!minYear) return false;
    if (year < minYear) return true;
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    key: i,
    value: ru.localize.month(i as Month),
    disabled: isDisabledMaxMonth(i) || isDisabledMinMonth(i),
  }));

  const years = Array.from({ length: 100 + yearsAfterCurrentDate }, (_, i) => ({
    key: currentYear + yearsAfterCurrentDate - yearsBeforeCurrentDate - i,
    value: currentYear + yearsAfterCurrentDate - yearsBeforeCurrentDate - i,
    disabled:
      isDisabledMaxYear(currentYear + yearsAfterCurrentDate - yearsBeforeCurrentDate - i) ||
      isDisabledMinYear(currentYear + yearsAfterCurrentDate - yearsBeforeCurrentDate - i),
  })).filter(({ disabled }) => !disabled);

  return (
    <div className={styles.header}>
      {!!years.length && (
        <DatePickerSelect
          options={years}
          checkedKey={date.getFullYear()}
          onChecked={({ key }) => changeYear(key)}
        />
      )}
      <DatePickerSelect
        options={months}
        checkedKey={date.getMonth()}
        onChecked={({ key }) => changeMonth(key)}
      />
      {!prevMonthButtonDisabled && (
        <button
          type="button"
          className={clsx(styles.arrows, styles.arrows_decrease)}
          onClick={decreaseMonth}
        >
          <ArrowLeft />
        </button>
      )}
      {!nextMonthButtonDisabled && (
        <button
          type="button"
          className={clsx(styles.arrows, styles.arrows_increase)}
          onClick={increaseMonth}
        >
          <ArrowRight />
        </button>
      )}
    </div>
  );
}
