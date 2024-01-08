import * as React from 'react';

export interface UsePaginationProps {
  /**
   * 시작과 끝에서 항상 표시되는 페이지 수입니다.
   * @default 1
   */
  boundaryCount?: number;
  /**
   * 총 아이템의 수입니다.
   * @default 1
   */
  total?: number;
  /**
   * 컴포넌트가 제어되지 않을 때 기본적으로 선택되는 페이지 값입니다.
   * @default 1
   */
  defaultPage?: number;
  /**
   * `true`인 경우 구성 요소가 비활성화됩니다.
   * @default false
   */
  disabled?: boolean;
  /**
   * `true`인 경우 줄임표를 숨깁니다.
   * @default false
   */
  hideEllipsis?: boolean;
  /**
   * `true`인 경우 다음 페이지 버튼을 숨깁니다.
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * `true`인 경우 이전 페이지 버튼을 숨깁니다.
   * @default false
   */
  hidePrevButton?: boolean;
  /**
   * 페이지가 변경되면 콜백이 시작됩니다.
   *
   * @param {React.ChangeEvent<unknown>} event event 콜백의 이벤트 소스입니다.
   * @param {number} page 선택한 페이지입니다.
   */
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  /**
   * 현재 페이지입니다.
   */
  page?: number;
  /**
   * 페이지당 행 수. `total` 와 `perPage`을 사용하여 페이지 수를 카운트합니다.
   * @default 10
   */
  perPage?: number;
  /**
   * `true`인 경우 첫 페이지 버튼을 표시합니다.
   * @default false
   */
  showFirstButton?: boolean;
  /**
   * `true`인 경우 마지막 페이지 버튼을 표시합니다.
   * @default false
   */
  showLastButton?: boolean;
  /**
   * 표시되는 최대 페이지 수입니다. 0 인경우 전체 페이지가 표시됩니다.
   * @default 10
   */
  maxPageCount?: number;
}

export type PaginationItemType =
  | 'page'
  | 'first'
  | 'last'
  | 'next'
  | 'previous'
  | 'start-ellipsis'
  | 'end-ellipsis';

export interface UsePaginationItem {
  onClick: React.ReactEventHandler;
  type: PaginationItemType;
  page: number | null;
  selected: boolean;
  disabled: boolean;
}

export interface UsePaginationResult {
  items: UsePaginationItem[];
}
