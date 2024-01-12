import { Path } from 'object-path';
import { HtmlHTMLAttributes, ReactNode } from 'react';

export type SizeType = 'normal' | 'small';
export type SortDirectionType = 'ascending' | 'descending';

export const textAlignClass = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
} as const;

export type TextAlignType = keyof typeof textAlignClass;

export interface IExcelExtra {
  title?: string;
  wch: number;
  numFmt?: string;
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
  render?: (v: any, record: RecordType, index: number) => React.ReactNode;
}

export interface IColumnGroup<RecordType> {
  title: string;
  titleAlign?: TextAlignType;
  children: IColumn<RecordType>[];
}

export type ColumnsType<T> = (IColumn<T> | IColumnGroup<T>)[];

export interface ITableRowSelection<RecordType> {
  selectedItem?: RecordType;
  selectedItems?: RecordType[];
  hideSelectColumn?: boolean;
  selectedClass?: string;
  onChange?: (args: { selectedItem?: RecordType; selectedItems: RecordType[] }) => void;
}

export interface ITablePagination {
  perPage?: number;
  total?: number;
  page?: number;
  onChange?: (args: { page: number; perPage: number }) => void;
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
  loading?: boolean;
}
