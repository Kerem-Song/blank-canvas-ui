import React from 'react';
import { toArray } from '@modules/utils';

import { ColumnsType } from '../Table.types';

export function convertChildrenToColumns<RecordType>(
  children: React.ReactNode,
): ColumnsType<RecordType> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return toArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      const { children: nodeChildren, ...restProps } = props;
      const column = {
        key,
        ...restProps,
      };

      if (nodeChildren) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        column.children = convertChildrenToColumns(nodeChildren);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return column;
    });
}

export * from './useHeaderInfo';
export * from './usePagenation';
export * from './useSortDataSource';
