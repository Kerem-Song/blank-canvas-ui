import * as React from 'react';
import { useControlled } from '@hooks/useControlled/useControlled';

import {
  UsePaginationItem,
  UsePaginationProps,
  UsePaginationResult,
} from './usePagination.types';

/**
 * 범위 생성하기
 * @example
 * range(0, 2) => [ 0, 1, 2 ]
 */
function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

export function usePagination(props?: UsePaginationProps): UsePaginationResult {
  const {
    boundaryCount = 1,
    defaultPage = 1,
    total = 0,
    disabled = false,
    hideEllipsis = false,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChange,
    page: pageProp,
    perPage = 10,
    showFirstButton = false,
    showLastButton = false,
    maxPageCount = 10,
    ...other
  } = props ?? {};

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    defaultValue: defaultPage,
  });

  const count = Math.floor(total / perPage) + (total % perPage ? 1 : 0);
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
  let siblingsStart;
  let siblingsEnd;

  if (maxPageCount) {
    siblingsStart = Math.min(
      Math.max(page - Math.floor(maxPageCount / 2), 1),
      count - maxPageCount + 1,
    );

    siblingsEnd = Math.min(
      Math.min(siblingsStart + maxPageCount - 1, count),
      boundaryCount > 0 ? endPages[0] - 1 : count,
    );

    if (boundaryCount > 0 && siblingsStart < boundaryCount + 1) {
      siblingsStart = boundaryCount + 1;
    }
  } else {
    siblingsStart = boundaryCount + 1;
    siblingsEnd = boundaryCount > 0 ? endPages[0] - 1 : count;
  }

  /**
   * 렌더링할 기본 목록
   * @example
   * itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
   */
  const itemList = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['previous']),
    ...startPages,

    // 시작 줄임표
    ...(!hideEllipsis && siblingsStart > boundaryCount + 1 ? ['start-ellipsis'] : []),

    // 페이지 형제들
    ...range(siblingsStart, siblingsEnd),

    // 끝 줄임표
    ...(!hideEllipsis && siblingsEnd < count - boundaryCount ? ['end-ellipsis'] : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ] as (UsePaginationItem['type'] | number)[];

  const handleClick = (event: React.MouseEvent, value: number | null) => {
    if (value === null) return;

    if (!pageProp) {
      setPageState(value);
    }
    if (handleChange) {
      handleChange(event, value);
    }
  };

  /** 버튼 유형을 페이지 번호에 매핑 */
  const buttonPage = (type: UsePaginationItem['type']) => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // 기본 목록을 PaginationItem props 객체로 변환하기
  const items = itemList.map((item) => {
    return typeof item === 'number'
      ? {
          onClick: (event: React.MouseEvent) => {
            handleClick(event, item);
          },
          type: 'page' as UsePaginationItem['type'],
          page: item,
          selected: item === page,
          disabled,
          'aria-current': item === page ? 'true' : undefined,
        }
      : {
          onClick: (event: React.MouseEvent) => {
            handleClick(event, buttonPage(item));
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (item.indexOf('ellipsis') === -1 &&
              (item === 'next' || item === 'last' ? page >= count : page <= 1)),
        };
  });

  return {
    items,
    ...other,
  };
}
