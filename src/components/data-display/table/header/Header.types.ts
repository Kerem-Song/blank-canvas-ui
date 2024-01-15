import { Path } from 'object-path';
import { ReactNode } from 'react';

import { ColumnsType, ISortInfo, TextAlignType } from '../Table.types';

export interface IHeaderInfo {
  title?: ReactNode;
  path?: Path;
  align?: TextAlignType;
  rowSpan?: number;
  colSpan?: number;
  sortable?: boolean;
}

export interface IHeaderRowProps<RecordType> {
  columns?: ColumnsType<RecordType>;
  sortInfo: ISortInfo[];
  setSortColumn?: (args: { path?: Path; sortable?: boolean }) => void;
}

export interface IHeaderCellProps extends IHeaderInfo {
  sortInfo: ISortInfo[];
  setSortColumn?: (args: { path?: Path; sortable?: boolean }) => void;
}