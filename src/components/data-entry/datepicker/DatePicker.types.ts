import { InputHTMLAttributes, ReactNode } from 'react';
import { ICalendarProps } from '@components/data-display/calendar/Calendar.types';

export interface IDatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>,
    ICalendarProps {
  format?: string;
  calendarIcon?: ReactNode;
}
