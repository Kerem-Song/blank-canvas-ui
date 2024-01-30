import { AnyObject } from '@models';
import classNames from 'classnames';
import * as objectPath from 'object-path';

import { tableClasses } from '../TableClasses';
import { IBodyRowProps } from './Body.types';
import { BodyCell } from './BodyCell';

export const BodyRow = <RecordType extends AnyObject = AnyObject>({
  columns,
  dataSource,
  rowClick,
  rowSelection,
}: IBodyRowProps<RecordType>) => {
  const handleRowClick = (rowSelected: boolean, item: RecordType) => {
    rowClick?.(item);
    if (rowSelection?.onChange) {
      const selectedItems = rowSelection.selectedItems
        ? [...rowSelection.selectedItems]
        : [];

      if (rowSelected) {
        selectedItems.splice(selectedItems.indexOf(item), 1);
        rowSelection.onChange({
          selectedItem: undefined,
          selectedItems,
        });
      } else {
        selectedItems.push(item);
        rowSelection.onChange({
          selectedItem: item,
          selectedItems,
        });
      }
    }
  };

  return (
    <>
      <tbody>
        {dataSource &&
          dataSource.map((row, rowIndex) => {
            const rowSelected =
              rowSelection?.selectedItem === row ||
              !!rowSelection?.selectedItems?.find((x) => x === row);

            return (
              columns && (
                <tr
                  key={rowIndex}
                  aria-selected={rowSelected}
                  onClick={() => handleRowClick(rowSelected, row)}
                  className={classNames({
                    'cursor-pointer': !!rowSelection,
                    [rowSelection?.selectedClass ?? '']: rowSelected,
                  })}
                >
                  {rowSelection?.selectedCell && (
                    <td className="text-center">
                      {rowSelection.selectedCell({ selected: rowSelected })}
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <BodyCell column={col} row={row} key={colIndex} />
                  ))}
                </tr>
              )
            );
          })}
      </tbody>
    </>
  );
};
