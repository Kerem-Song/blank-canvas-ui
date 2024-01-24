import { IcArrowLeft, IcArrowRight, IcCalendar } from '@assets/icons';
import { Button } from '@components';
import classNames from 'classnames';
import * as dayjs from 'dayjs';
import { InputHTMLAttributes, useEffect, useState } from 'react';

import { Input } from '..';

export interface IDatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

export const DatePicker = ({ value, ...inputProps }: IDatePickerProps) => {
  const [currentStartDay, setCurrentStartDay] = useState<dayjs.Dayjs>(
    dayjs(value).startOf('M'),
  );
  const formattedValue = value ? dayjs(value).format('YYYY-MM-DD') : '';

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

  return (
    <div className="group relative">
      <Input
        value={formattedValue}
        {...inputProps}
        autoComplete="off"
        suffix={<IcCalendar className="opacity-25" width={20} height={20} />}
      />
      <div className="absolute top-[110%] z-50 hidden rounded border bg-white p-2 group-focus-within:block group-active:block">
        <div className="flex items-center p-1">
          <div className="flex-none">
            <Button size="sm" variant="text" className="!py-2" onClick={prevMonth}>
              <IcArrowLeft />
            </Button>
          </div>
          <div className="grow py-2 text-xs font-black">
            <span>
              {currentStartDay.format('MMMM')} {currentStartDay.year()}
            </span>
          </div>
          <div className="flex-none">
            <Button size="sm" variant="text" className="!py-2" onClick={nextMonth}>
              <IcArrowRight />
            </Button>
          </div>
        </div>
        <div className="flex px-2 text-xs font-bold">
          <div className="flex h-[32px] w-[32px] items-center justify-center capitalize text-gray-400">
            sun
          </div>
          <div className="flex h-[32px] w-[32px] items-center justify-center capitalize text-gray-400">
            mon
          </div>
          <div className="flex h-[32px] w-[32px] items-center justify-center capitalize text-gray-400">
            tue
          </div>
          <div className="flex h-[32px] w-[32px] items-center justify-center capitalize text-gray-400">
            wed
          </div>
          <div className="flex h-[32px] w-[32px] items-center justify-center capitalize text-gray-400">
            thu
          </div>
          <div className="flex h-[32px] w-[32px] items-center justify-center capitalize text-gray-400">
            fri
          </div>
          <div className="flex h-[32px] w-[32px] items-center justify-center capitalize text-gray-400">
            sat
          </div>
        </div>
        {Array.from({ length: weeks }).map((r, rIndex) => (
          <div className="flex px-2 text-xs font-bold" key={rIndex}>
            {Array.from({ length: 7 }).map((c, cIndex) => {
              const date = start.add(rIndex * 7 + cIndex, 'days');
              const outOfMonth = date.startOf('M').diff(today.startOf('M')) !== 0;
              return (
                <div
                  key={cIndex}
                  className={classNames(
                    'flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full hover:bg-gray-150',
                    {
                      'text-gray-400': outOfMonth,
                    },
                  )}
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
