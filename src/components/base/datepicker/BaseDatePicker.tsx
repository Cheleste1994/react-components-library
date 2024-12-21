import clsx from 'clsx';
import { ru } from 'date-fns/locale/ru';
import DatePicker, { DatePickerProps, registerLocale } from 'react-datepicker';

import { ReactComponent as CalendarIcon } from '@icons/calendar.svg';

import BaseTextInput, { BaseTextInputProps } from '../text-input/BaseTextInput';

import styles from './base-datepicker.module.scss';
import DatePickerHeader from './components/DatePickerHeader';

registerLocale('ru', ru);

type InputProps = Pick<
  BaseTextInputProps,
  | 'maxWidth'
  | 'IconEnd'
  | 'IconStart'
  | 'success'
  | 'warning'
  | 'error'
  | 'radius'
  | 'textAlign'
  | 'height'
  | 'padding'
  | 'fontStyle'
>;

type DateFormatVariables = 'dd/MM/yyyy' | 'dd.MM.YYYY';

type BaseDatePickerProps = DatePickerProps &
  InputProps & {
    yearsAfterCurrentDate?: number;
    yearsBeforeCurrentDate?: number;
    dateFormatVariables?: DateFormatVariables;
  };

export default function BaseDatePicker(props: BaseDatePickerProps) {
  const { yearsAfterCurrentDate = 1, yearsBeforeCurrentDate = 0, maxWidth, ...rest } = props;
  const { IconEnd, IconStart, success, warning, error, radius, height, fontStyle, ...r } = rest;
  const { textAlign, padding, children, dateFormatVariables = 'dd.MM.YYYY', ...calendarProps } = r;

  return (
    <DatePicker
      customInput={
        <BaseTextInput
          IconEnd={IconEnd || <CalendarIcon style={{ cursor: 'pointer' }} />}
          maxWidth={'full'}
          IconStart={IconStart}
          success={success}
          warning={warning}
          error={error}
          radius={radius}
          height={height}
          padding={padding}
          textAlign={textAlign}
          fontStyle={fontStyle}
        />
      }
      dateFormat={dateFormatVariables}
      locale="ru"
      renderCustomHeader={(props) =>
        DatePickerHeader({
          ...props,
          yearsAfterCurrentDate,
          yearsBeforeCurrentDate,
          maxDate: calendarProps.maxDate,
          minDate: calendarProps.minDate,
        })
      }
      wrapperClassName={clsx(styles.wrapper, styles[`max-width_${maxWidth}`])}
      calendarClassName={styles.calendar}
      {...calendarProps}
    >
      {children}
    </DatePicker>
  );
}
