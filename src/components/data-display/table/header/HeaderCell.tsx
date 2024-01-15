import classNames from 'classnames';

import { tableClasses } from '../TableClasses';
import { IHeaderCellProps } from './Header.types';
import { HeaderSortIcon } from './HeaderSortIcon';

export const HeaderCell = ({
  title,
  path,
  colSpan,
  rowSpan,
  align,
  sortable,
  sortInfo,
  setSortColumn,
}: IHeaderCellProps) => {
  return (
    <th
      className={classNames(tableClasses['text-align'][align ?? 'left'], {
        [tableClasses.sortable]: sortable,
      })}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={() => setSortColumn?.({ path, sortable })}
    >
      {title}
      <HeaderSortIcon path={path} sortInfo={sortInfo} sortable={sortable} />
    </th>
  );
};
