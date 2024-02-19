import { useEffect, useState } from 'react';
import { IcCalendar } from '@assets/icons';
import { Calendar } from '@components';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { Input } from '..';

import { IDatePickerProps } from './DatePicker.types';
import { datePickerClasses } from './DatePickerClasses';

export const DatePicker = ({
  selectedDate,
  onChange,
  hasItemDates,
  format = 'YYYY-MM-DD',
  calendarIcon = <IcCalendar className="opacity-25" width={20} height={20} />,
  ...inputProps
}: IDatePickerProps) => {
  useEffect(() => {
    setInputValue(selectedDate ? dayjs(selectedDate).format(format) : '');
  }, [selectedDate]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeDate = () => {
    if (inputValue === '') {
      onChange?.(null);
      return;
    }
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
