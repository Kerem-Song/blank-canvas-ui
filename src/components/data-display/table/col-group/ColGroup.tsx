import { AnyObject } from '@models';

import { ITableColGroupProps } from './ColGroup.types';

export const TableColGroup = <RecordType extends AnyObject = AnyObject>({
  showSelectedCell,
  allColumns,
}: ITableColGroupProps<RecordType>) => {
  return (
    <>
      {allColumns && (
        <colgroup>
          {showSelectedCell && <col style={{ width: 80 }} />}
          {allColumns?.map((column, index) => {
            return <col key={index} width={column.width ?? 'auto'} />;
          })}
        </colgroup>
      )}
    </>
  );
};
