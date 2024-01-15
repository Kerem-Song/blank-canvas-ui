import { IColumn, ITableRowSelection } from '../Table.types';

export interface IBodyRowProps<RecordType> {
  columns?: IColumn<RecordType>[];
  dataSource?: RecordType[];
  /**
   * row 클릭 이벤트
   */
  rowClick?: (row: RecordType) => void;

  rowSelection?: ITableRowSelection<RecordType>;
}

export interface IBodyCellProps<RecordType> {
  row: RecordType;
  column: IColumn<RecordType>;
}
