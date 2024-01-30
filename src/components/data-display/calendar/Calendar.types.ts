export interface ICalendarProps {
  className?: string;
  selectedDate: Date | null;
  onChange?: (date: Date | null) => void;
  hasItemDates?: Date[];
}
