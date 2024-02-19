import { FunctionComponent, ReactNode } from 'react';
import { Path } from 'object-path';

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
  showSelectedCell?: boolean;
}

export interface IHeaderCellProps extends IHeaderInfo {
  sortInfo: ISortInfo[];
  setSortColumn?: (args: { path?: Path; sortable?: boolean }) => void;
}
