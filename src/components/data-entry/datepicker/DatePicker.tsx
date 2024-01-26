import {
  IcArrowLeft,
  IcArrowLeftDouble,
  IcArrowRight,
  IcArrowRightDouble,
  IcCalendar,
} from '@assets/icons';
import { Button } from '@components';
import classNames from 'classnames';
import * as dayjs from 'dayjs';
import { InputHTMLAttributes, ReactNode, useState } from 'react';

import { Input } from '..';
import { datePickerClasses } from './DatePickerClasses';

export interface IDatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: Date | null;
  onChange?: (date: Date | null) => void;
  format?: string;
  calendarIcon?: ReactNode;
}

export const DatePicker = ({
  value,
  onChange,
  format = 'YYYY-MM-DD',
  calendarIcon = <IcCalendar className="opacity-25" width={20} height={20} />,
  ...inputProps
}: IDatePickerProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>(
    value ? dayjs(value).format(format) : undefined,
  );
  const [currentStartDay, setCurrentStartDay] = useState<dayjs.Dayjs>(
    dayjs(value ?? undefined).startOf('M'),
  );

  const today = currentStartDay.startOf('day');
  const start = currentStartDay.startOf('month').day(0);
  const end = currentStartDay.endOf('month').day(6);
  const weeks = end.diff(start, 'weeks') + 1;

  const prevMonth = () => {
    setCurrentStartDay((v) => v.add(-1, 'M'));
  };

  const nextMonth = () => {
    setCurrentStartDay((v) => v.add(1, 'M'));
  };

  const prevYear = () => {
    setCurrentStartDay((v) => v.add(-1, 'y'));
  };

  const nextYear = () => {
    setCurrentStartDay((v) => v.add(1, 'y'));
  };

  const handleChangeDate = () => {
    const date = dayjs(inputValue);
    if (date.isValid()) {
      setInputValue(date.format(format));
      onChange?.(date.toDate());
      setCurrentStartDay(date.startOf('M'));
    } else {
      setInputValue(value ? dayjs(value).format(format) : '');
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
        onBlur={handleChangeDate}
        autoComplete="off"
        suffix={calendarIcon}
        onPressEnter={() => handleChangeDate()}
      />
      <div
        className={classNames(
          datePickerClasses.calendar.root,
          'group-focus-within:block group-active:block',
        )}
      >
        <div className={datePickerClasses.calendar.header.wrap}>
          <div className={datePickerClasses.calendar.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={prevYear}>
              <IcArrowLeftDouble />
            </Button>
          </div>
          <div className={datePickerClasses.calendar.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={prevMonth}>
              <IcArrowLeft />
            </Button>
          </div>
          <div className={datePickerClasses.calendar.header.title}>
            <span>
              {currentStartDay.format('MMMM')} {currentStartDay.year()}
            </span>
          </div>
          <div className={datePickerClasses.calendar.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={nextMonth}>
              <IcArrowRight />
            </Button>
          </div>
          <div className={datePickerClasses.calendar.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={nextYear}>
              <IcArrowRightDouble />
            </Button>
          </div>
        </div>
        <div className={datePickerClasses.calendar.weeknames.wrap}>
          <div className={datePickerClasses.calendar.weeknames.item}>sun</div>
          <div className={datePickerClasses.calendar.weeknames.item}>mon</div>
          <div className={datePickerClasses.calendar.weeknames.item}>tue</div>
          <div className={datePickerClasses.calendar.weeknames.item}>wed</div>
          <div className={datePickerClasses.calendar.weeknames.item}>thu</div>
          <div className={datePickerClasses.calendar.weeknames.item}>fri</div>
          <div className={datePickerClasses.calendar.weeknames.item}>sat</div>
        </div>
        {Array.from({ length: weeks }).map((r, rIndex) => (
          <div className={datePickerClasses.calendar.week.root} key={rIndex}>
            {Array.from({ length: 7 }).map((c, cIndex) => {
              const date = start.add(rIndex * 7 + cIndex, 'days');
              const outOfMonth = date.startOf('M').diff(today.startOf('M')) !== 0;
              const isSelected = dayjs(value).diff(date, 'D') === 0;
              return (
                <div
                  key={cIndex}
                  onClick={() => {
                    setInputValue(date.format(format));
                    onChange?.(date.toDate());
                    if (outOfMonth) {
                      setCurrentStartDay(date.startOf('M'));
                    }
                  }}
                  className={classNames(datePickerClasses.calendar.week.day.base, {
                    [datePickerClasses.calendar.week.day.outOfMonth]: outOfMonth,
                    [datePickerClasses.calendar.week.day.selected]: isSelected,
                  })}
                >
                  {date.format('D')}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
