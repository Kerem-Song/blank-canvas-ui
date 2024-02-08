import classNames from 'classnames';
import dayjs from 'dayjs';
import { useState } from 'react';
import { calendarClasses } from './CalendarClasses';
import { Button } from '@components';
import {
  IcArrowLeft,
  IcArrowLeftDouble,
  IcArrowRight,
  IcArrowRightDouble,
} from '@assets/icons';
import { ICalendarProps } from './Calendar.types';

const weeks = [0, 1, 2, 3, 4, 5];

export const Calendar = ({
  className,
  onChange,
  selectedDate,
  hasItemDates,
}: ICalendarProps) => {
  const [currentStartDay, setCurrentStartDay] = useState<dayjs.Dayjs>(
    dayjs().startOf('M'),
  );

  const today = currentStartDay.startOf('day');
  const start = currentStartDay.startOf('month').day(0);

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

  return (
    <>
      <div className={classNames(calendarClasses.wrap, className)}>
        <div className={calendarClasses.header.wrap}>
          <div className={calendarClasses.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={prevYear}>
              <IcArrowLeftDouble />
            </Button>
          </div>
          <div className={calendarClasses.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={prevMonth}>
              <IcArrowLeft />
            </Button>
          </div>
          <div className={calendarClasses.header.title}>
            <span>
              {currentStartDay.format('MMMM')} {currentStartDay.year()}
            </span>
          </div>
          <div className={calendarClasses.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={nextMonth}>
              <IcArrowRight />
            </Button>
          </div>
          <div className={calendarClasses.header.buttonWrap}>
            <Button size="sm" variant="text" onClick={nextYear}>
              <IcArrowRightDouble />
            </Button>
          </div>
        </div>
        <div className={calendarClasses.weeknames.wrap}>
          <div className={calendarClasses.weeknames.item}>sun</div>
          <div className={calendarClasses.weeknames.item}>mon</div>
          <div className={calendarClasses.weeknames.item}>tue</div>
          <div className={calendarClasses.weeknames.item}>wed</div>
          <div className={calendarClasses.weeknames.item}>thu</div>
          <div className={calendarClasses.weeknames.item}>fri</div>
          <div className={calendarClasses.weeknames.item}>sat</div>
        </div>
        {weeks.map((r, rIndex) => (
          <div className={calendarClasses.week.root} key={rIndex}>
            {Array.from({ length: 7 }).map((c, cIndex) => {
              const date = start.add(rIndex * 7 + cIndex, 'days');
              const outOfMonth = date.startOf('M').diff(today.startOf('M')) !== 0;
              const isSelected = dayjs(selectedDate).diff(date, 'D') === 0;
              const hasItem =
                hasItemDates &&
                hasItemDates.find((d) => {
                  return dayjs(d).startOf('D').diff(date, 'D') === 0;
                });
              return (
                <div key={cIndex}>
                  <div
                    onClick={() => {
                      onChange?.(date.toDate());
                      if (outOfMonth) {
                        setCurrentStartDay(date.startOf('M'));
                      }
                    }}
                    className={classNames(calendarClasses.week.day.base, {
                      [calendarClasses.week.day.outOfMonth]: outOfMonth,
                      [calendarClasses.week.day.selected]: isSelected,
                    })}
                  >
                    {date.format('D')}
                  </div>
                  {!!hasItemDates && (
                    <div className="flex h-2 items-center justify-center gap-0.5">
                      {hasItem && (
                        <div
                          className={classNames(calendarClasses.week.day.hasitem.root, {
                            [calendarClasses.week.day.hasitem.selected]: isSelected,
                          })}
                        ></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};
