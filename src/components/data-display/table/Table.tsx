import React, { ReactElement, Ref } from 'react';
import { Flex, Pagination, Spin } from '@components';
import { AnyObject } from '@models';
import classNames from 'classnames';

import { TableColGroup } from './col-group/ColGroup';
import { BodyRow } from './body';
import { HeaderRow } from './header';
import { convertChildrenToColumns, usePagenation, useSortDataSource } from './hooks';
import { ColumnsType, IColumn, ITableProps } from './Table.types';
import { tableClasses } from './TableClasses';

export const TableComp = <RecordType extends AnyObject = AnyObject>(
  {
    columns,
    dataSource,
    rounded,
    bordered,
    empty = '데이터가 존재하지 않습니다.',
    size = 'normal',
    loading,
    wrapClassName,
    children,
    rowClick,
    rowSelection,
    defaultSort,
    pagenation,
    ...tableProps
  }: ITableProps<RecordType>,
  ref: Ref<HTMLTableElement>,
) => {
  const baseColumns = React.useMemo(
    () => columns || convertChildrenToColumns<RecordType>(children),
    [columns, children],
  );

  const getColumns = (cols?: ColumnsType<RecordType>): IColumn<RecordType>[] => {
    if (!cols) {
      return [];
    }

    const result = cols.map((c) => {
      if ('children' in c) {
        return getColumns(c.children);
      } else {
        return [c];
      }
    });

    return result.flat();
  };

  const allColumns = getColumns(baseColumns);

  const { sortInfo, setSortColumn, sortItems } = useSortDataSource({
    columns: allColumns,
    dataSource,
    defaultSort,
  });

  const { resultItems } = usePagenation(pagenation, sortItems);

  return (
    <div
      className={classNames(tableClasses.wrap, wrapClassName, tableClasses.size[size], {
        [tableClasses.rounded]: rounded,
        [tableClasses.border]: bordered,
      })}
    >
      <table {...tableProps} ref={ref}>
        <TableColGroup
          allColumns={allColumns}
          showSelectedCell={!!rowSelection?.selectedCell}
        />
        <HeaderRow
          columns={baseColumns}
          sortInfo={sortInfo}
          setSortColumn={setSortColumn}
          showSelectedCell={!!rowSelection?.selectedCell}
        />
        <BodyRow
          columns={allColumns}
          dataSource={resultItems}
          rowClick={rowClick}
          rowSelection={rowSelection}
        />
      </table>
      {!resultItems.length && !loading && (
        <div className={tableClasses.empty}>{empty}</div>
      )}
      {loading && (
        <div className={tableClasses.loading}>
          <Spin type={loading === true ? 'spinningBubbles' : loading} spinning={true} />
        </div>
      )}
      {!!pagenation && (
        <Flex justify="center" className="p-1">
          <Pagination {...pagenation} />
        </Flex>
      )}
    </div>
  );
};

export const Table = React.forwardRef(TableComp) as <T extends AnyObject = AnyObject>(
  p: ITableProps<T> & { ref?: Ref<HTMLTableElement> },
) => ReactElement;
