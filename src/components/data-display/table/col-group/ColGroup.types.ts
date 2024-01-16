import { IColumn } from '../Table.types';

export interface ITableColGroupProps<T> {
  showSelectedCell?: boolean;
  allColumns?: IColumn<T>[];
}
