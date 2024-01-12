import { AnyObject } from '@models';
import classNames from 'classnames';
import React, { ReactElement, Ref } from 'react';

import { IColumn, IColumnGroup, ITableProps } from './Table.types';
import { tableClasses } from './TableClasses';

export const TableComp = <RecordType extends AnyObject = AnyObject>(
  {
    columns,
    dataSource,
    rounded,
    bordered,
    empty = '데이터가 존재하지 않습니다.',
    size,
    loading,
    wrapClassName,
    className,
    children,
    ...tableProps
  }: ITableProps<RecordType>,
  ref: Ref<HTMLTableElement>,
) => {
  return (
    <div
      className={classNames(tableClasses.wrap, wrapClassName, {
        'rounded-md': rounded,
        border: bordered,
      })}
    >
      <table
        className={classNames(tableClasses.table, className)}
        {...tableProps}
        ref={ref}
      >
        <thead>
          <tr>
            <th>AAA</th>
            <th>BBB</th>
            <th>CCC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>111</td>
            <td>111</td>
            <td>111</td>
          </tr>
          <tr>
            <td>222</td>
            <td>222</td>
            <td>222</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
          <tr>
            <td>333</td>
            <td>333</td>
            <td>333</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const TableColumnGroup = <RecordType extends AnyObject = AnyObject>(
  args: IColumnGroup<RecordType>,
) => {
  return null;
};

export const TableColumn = <RecordType extends AnyObject = AnyObject>(
  args: IColumn<RecordType>,
) => {
  return null;
};

export const Table = React.forwardRef(TableComp) as <T extends AnyObject = AnyObject>(
  p: ITableProps<T> & { ref?: Ref<HTMLTableElement> },
) => ReactElement;
