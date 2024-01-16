import { AnyObject } from '@models';
import classNames from 'classnames';
import * as objectPath from 'object-path';

import { tableClasses } from '../TableClasses';
import { IBodyCellProps } from './Body.types';

export const BodyCell = <RecordType extends AnyObject = AnyObject>({
  row,
  column,
}: IBodyCellProps<RecordType>) => {
  const getSafeRender = (value: unknown) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return <>{value}</>;
  };

  return (
    <td
      className={classNames(
        tableClasses['text-align'][column.align ?? 'left'],
        column.className,
      )}
    >
      {column.render
        ? column.render(column.path ? objectPath.get(row, column.path) : undefined, row)
        : column.path
          ? getSafeRender(objectPath.get(row, column.path))
          : undefined}
    </td>
  );
};
