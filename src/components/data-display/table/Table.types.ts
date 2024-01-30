import { PaginationProps } from '@components/navigation/pagination';
import { Path } from 'object-path';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import { LoadingType } from 'react-loading';

export type SizeType = 'normal' | 'small';
export type SortDirectionType = 'ascending' | 'descending';

export type TextAlignType = 'left' | 'center' | 'right';

export interface IExcelExtra {
  title?: string;
  wch: number;
  numFmt?: string;
}

export interface ISortInfo {
  path: Path;
  direction: SortDirectionType;
}

export interface IColumn<RecordType> {
  /**
   * Data Property 이름
   */
  path?: Path;
  title: ReactNode;
  width?: number | string;
  className?: string;
  titleAlign?: TextAlignType;
  align?: TextAlignType;
  sortable?: boolean;
  excelExtra?: IExcelExtra;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (v: any, record: RecordType) => React.ReactNode;
}

export interface IColumnGroup<RecordType> {
  title: string;
  titleAlign?: TextAlignType;
  children: ColumnsType<RecordType>;
}

export type ColumnType<T> = IColumn<T> | IColumnGroup<T>;
export type ColumnsType<T> = ColumnType<T>[];

export interface ITableRowSelection<RecordType> {
  selectedItem?: RecordType;
  selectedItems?: RecordType[];
  selectedClass?: string;
  selectedCell?: (props: { selected: boolean }) => React.ReactNode;
  onChange?: (args: { selectedItem?: RecordType; selectedItems: RecordType[] }) => void;
}

export interface ITablePagination extends PaginationProps {}

export interface ITableColumnProps<RecordType> extends IColumn<RecordType> {
  children?: null;
}

export interface ITableColumnGroupProps<RecordType>
  extends Omit<IColumnGroup<RecordType>, 'children'> {
  children:
    | React.ReactElement<ITableColumnProps<RecordType>>
    | React.ReactElement<ITableColumnProps<RecordType>>[];
}

export interface ITableProps<RecordType> extends HtmlHTMLAttributes<HTMLTableElement> {
  /**
   * wrap 영역의 class
   */
  wrapClassName?: string;
  /**
   * Table 의 컬럼 정의
   */
  columns?: ColumnsType<RecordType>;

  /**
   * Table 의 내용
   */
  dataSource?: RecordType[];

  /**
   * 모서리 round여부
   */
  rounded?: boolean;

  /**
   * 외곽선 여부
   */
  bordered?: boolean;

  /**
   * dataSource 가 없을 시 보여 줄 element
   */
  empty?: React.ReactNode;

  /**
   * 테이블 내 텍스트 사이즈
   */
  size?: SizeType;

  /**
   * 로딩
   */
  loading?: boolean | LoadingType;

  defaultSort?: ISortInfo[];

  /**
   * row 클릭 이벤트
   */
  rowClick?: (row: RecordType) => void;

  rowSelection?: ITableRowSelection<RecordType>;

  pagenation?: ITablePagination;
}
