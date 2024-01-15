import { AnyObject } from '@models';
import * as objectPath from 'object-path';
import { Path } from 'object-path';
import { useState } from 'react';

import { IColumn, ISortInfo } from '../Table.types';

export const useSortDataSource = <T extends AnyObject = AnyObject>(args: {
  columns?: IColumn<T>[];
  defaultSort?: ISortInfo[];
  dataSource?: T[];
}) => {
  const [sortInfo, setSortInfo] = useState<ISortInfo[]>(args.defaultSort ?? []);
  const isSort = !!args.columns?.find((x) => x.sortable) && sortInfo.length > 0;

  const setSortColumn = (args: { path?: Path; sortable?: boolean }) => {
    if (!args.sortable || !args.path) {
      return;
    }
    const found = sortInfo.find((x) => x.path === args.path);
    if (!found) {
      setSortInfo([...sortInfo, { path: args.path, direction: 'ascending' }]);
      return;
    }

    if (found.direction === 'descending') {
      sortInfo.splice(sortInfo.indexOf(found), 1);
      setSortInfo([...sortInfo]);
      return;
    }
    found.direction = found.direction === 'ascending' ? 'descending' : 'ascending';
    setSortInfo([...sortInfo]);
  };

  const sortItems = [...(args.dataSource ?? [])];
  if (isSort) {
    sortItems?.sort((a, b) => {
      const sortValue = sortInfo.reduce((result, si) => {
        if (result !== 0) {
          return result;
        }

        const av = si.direction === 'ascending' ? 1 : -1;
        const dv = si.direction === 'ascending' ? -1 : 1;
        const v =
          objectPath.get(a, si.path) === objectPath.get(b, si.path)
            ? 0
            : objectPath.get(a, si.path) > objectPath.get(b, si.path)
              ? av
              : dv;

        return v;
      }, 0);
      return sortValue;
    });
  }

  return { sortInfo, setSortColumn, sortItems };
};
