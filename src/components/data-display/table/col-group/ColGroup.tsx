import { AnyObject } from '@models';

import { ITableColGroupProps } from './ColGroup.types';

export const TableColGroup = <RecordType extends AnyObject = AnyObject>({
  allColumns,
}: ITableColGroupProps<RecordType>) => {
  return (
    <>
      {allColumns && (
        <colgroup>
          {allColumns?.map((column, index) => {
            return <col key={index} width={column.width ?? 'auto'} />;
          })}
        </colgroup>
      )}
    </>
  );
};
