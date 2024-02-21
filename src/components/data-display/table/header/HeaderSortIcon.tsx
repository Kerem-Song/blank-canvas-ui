import { IcSortAsc, IcSortDesc, IcSortNone } from '@assets/icons';
import { Path } from 'object-path';

import { ISortInfo } from '../Table.types';
import { tableClasses } from '../TableClasses';

export interface IHeaderSortIconProps {
  sortable?: boolean;
  path?: Path;
  sortInfo: ISortInfo[];
}
export const HeaderSortIcon = ({ sortable, path, sortInfo }: IHeaderSortIconProps) => {
  if (!sortable) {
    return '';
  }

  const sort = sortInfo.find((x) => x.path === path);

  return (
    <span className="absolute top-[50%] translate-y-[-50%]">
      {sort ? (
        sort.direction === 'ascending' ? (
          <IcSortAsc className={tableClasses.sortable.svg} />
        ) : (
          <IcSortDesc className={tableClasses.sortable.svg} />
        )
      ) : (
        <IcSortNone className={tableClasses.sortable.svg} />
      )}
    </span>
  );
};
