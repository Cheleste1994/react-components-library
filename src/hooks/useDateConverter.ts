import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function useDateConverter(initialDateFormat = 'DD.MM.YYYY') {
  const dateToString = (date: Date | null, dateFormat?: string): string =>
    date ? dayjs(date).format(dateFormat || initialDateFormat) : '';

  const stringToDate = (dateStr: string, dateFormat?: string): Date | null =>
    dateStr ? dayjs(dateStr, dateFormat || initialDateFormat).toDate() : null;

  return { dateToString, stringToDate };
}
