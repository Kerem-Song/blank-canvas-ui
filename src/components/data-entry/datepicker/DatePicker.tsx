import { IcCalendar } from '@assets/icons';
import classNames from 'classnames';
import * as dayjs from 'dayjs';
import { InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';

import { Calendar } from '@components/data-display/calendar/Calendar';
import { Input } from '..';
import { datePickerClasses } from './DatePickerClasses';
import { ICalendarProps } from '@components/data-display/calendar/Calendar.types';

export interface IDatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>,
    ICalendarProps {
  format?: string;
  calendarIcon?: ReactNode;
}

export const DatePicker = ({
  selectedDate,
  onChange,
  hasItemDates,
  format = 'YYYY-MM-DD',
  calendarIcon = <IcCalendar className="opacity-25" width={20} height={20} />,
  ...inputProps
}: IDatePickerProps) => {
  useEffect(() => {
    setInputValue(selectedDate ? dayjs(selectedDate).format(format) : undefined);
  }, [selectedDate]);
  const [inputValue, setInputValue] = useState<string | undefined>();

  const handleChangeDate = () => {
    const date = dayjs(inputValue);
    if (date.isValid()) {
      setInputValue(date.format(format));
      onChange?.(date.toDate());
    } else {
      setInputValue(selectedDate ? dayjs(selectedDate).format(format) : '');
    }
  };

  return (
    <div className={classNames(datePickerClasses.wrap, 'group')}>
      <Input
        value={inputValue}
        {...inputProps}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="text-sm"
        onBlur={handleChangeDate}
        autoComplete="off"
        suffix={calendarIcon}
        onPressEnter={() => handleChangeDate()}
      />
      <Calendar
        className={classNames(
          datePickerClasses.calendar,
          'group-focus-within:block group-active:block',
        )}
        selectedDate={selectedDate}
        hasItemDates={hasItemDates}
        onChange={onChange}
      />
    </div>
  );
};
