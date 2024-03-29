import { AnyObject } from '@models';

import { useHeaderInfo } from '../hooks/useHeaderInfo';

import { IHeaderRowProps } from './Header.types';
import { HeaderCell } from './HeaderCell';

export const HeaderRow = <RecordType extends AnyObject = AnyObject>({
  columns,
  sortInfo,
  setSortColumn,
  showSelectedCell,
}: IHeaderRowProps<RecordType>) => {
  const headerInfo = useHeaderInfo(columns);
  return (
    <>
      <thead>
        {headerInfo &&
          headerInfo.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {showSelectedCell && <th></th>}
              {row.map((col, colIndex) => (
                <HeaderCell
                  {...col}
                  key={colIndex}
                  sortInfo={sortInfo}
                  setSortColumn={setSortColumn}
                />
              ))}
            </tr>
          ))}
      </thead>
    </>
  );
};
