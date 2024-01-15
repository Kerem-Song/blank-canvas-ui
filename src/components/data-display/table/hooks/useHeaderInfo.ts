import { IHeaderInfo } from '../header/Header.types';
import { ColumnsType } from '../Table.types';

const getRowCount = <RecordType>(
  columns: ColumnsType<RecordType>,
  rowCount = 1,
): number[] => {
  const result = columns.map((column) => {
    if ('children' in column) {
      return getRowCount(column.children, rowCount + 1);
    } else {
      return [rowCount];
    }
  });

  return result.flat();
};

export const useHeaderInfo = <RecordType>(rootColumns?: ColumnsType<RecordType>) => {
  if (!rootColumns) {
    return undefined;
  }
  const result: IHeaderInfo[][] = [];
  const maxRows = Math.max(...getRowCount(rootColumns));

  const FillHeaderCell = <RecordType>(
    columns: ColumnsType<RecordType>,
    colindex: number,
    rowindex: number = 0,
  ): number[] => {
    result[rowindex] = result[rowindex] || [];
    let currentColIndex = colindex;
    const colCount = columns.map((column) => {
      if ('children' in column) {
        const subColCount = FillHeaderCell(
          column.children,
          currentColIndex,
          rowindex + 1,
        );

        const colSpan = subColCount.reduce((a, b) => a + b, 0);
        currentColIndex += colSpan;

        result[rowindex].push({
          title: column.title,
          align: column.titleAlign,
          colSpan,
        });

        return colSpan;
      } else {
        result[rowindex].push({
          title: column.title,
          path: column.path,
          align: column.titleAlign ?? column.align,
          sortable: column.sortable,
          rowSpan: maxRows - rowindex,
        });

        currentColIndex++;
        return 1;
      }
    });

    return colCount;
  };

  FillHeaderCell(rootColumns, 0);
  return result;
};
