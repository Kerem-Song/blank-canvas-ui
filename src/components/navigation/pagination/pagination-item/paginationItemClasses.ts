export interface PaginationItemClasses {
  /** 루트 엘리먼트에 적용되는 스타일. */
  root: string;
  /** `type="page"`일 때 루트 엘리먼트에 적용되는 스타일. */
  page: string;
  /** `disabled={true}`일 때 루트 엘리먼트에 적용되는 상태 클래스. */
  disabled: string;
  /** `selected={true}`일 때 루트 엘리먼트에 적용되는 상태 클래스. */
  selected: string;
  /** `size="sm"`일 때 루트 엘리먼트에 적용되는 스타일. */
  sizeSmall: string;
  /** `size="md"`일 때 루트 엘리먼트에 적용되는 스타일. */
  sizeMedium: string;
  /** `size="lg"`일 때 루트 엘리먼트에 적용되는 스타일. */
  sizeLarge: string;
  /** 루트 요소에 적용된 스타일 `shape="circle"`. */
  shapeCircle: string;
  /** 루트 요소에 적용된 스타일 `shape="round"`. */
  shapeRound: string;
  /** `variant="contained"`일 때 루트 엘리먼트에 적용되는 스타일. */
  contained: string;
  /** `variant="contained"` 및 `color="primary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  containedPrimary: string;
  /** `variant="contained"` 및 `color="secondary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  containedSecondary: string;
  /** `variant="text"`일 때 루트 엘리먼트에 적용되는 스타일. */
  text: string;
  /** `variant="text"` 및 `color="primary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  textPrimary: string;
  /** `variant="text"` 및 `color="secondary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  textSecondary: string;
  /** `variant="outlined"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlined: string;
  /** `variant="outlined"` 및 `color="primary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlinedPrimary: string;
  /** `variant="outlined"` 및 `color="secondary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlinedSecondary: string;
  /** `rounded="true"`일 때 루트 엘리먼트에 적용되는 스타일. */
  rounded: string;
  /** `type="start-ellipsis"` 또는 `type="end-ellipsis"`일 때 루트 엘리먼트에 적용되는 스타일. */
  ellipsis: string;
  /** `type="first"` 또는 `type="last"`일 때 루트 엘리먼트에 적용되는 스타일. */
  firstLast: string;
  /** `type="previous"` 또는 `type="next"`일 때 루트 엘리먼트에 적용되는 스타일. */
  previousNext: string;
  /** 표시할 아이콘에 적용되는 스타일. */
  icon: string;
}

export type PaginationItemClassKey = keyof PaginationItemClasses;

export const paginationItemClasses: PaginationItemClasses = {
  root: '',
  page: 'page',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
  disabled: 'disabled',
  selected: 'selected',
  shapeCircle: 'circle',
  shapeRound: 'round',
  contained: 'contained',
  containedPrimary: 'containedPrimary',
  containedSecondary: 'containedSecondary',
  text: 'text',
  textPrimary: 'textPrimary',
  textSecondary: 'textSecondary',
  outlined: 'outlined',
  outlinedPrimary: 'outlinedPrimary',
  outlinedSecondary: 'outlinedSecondary',
  rounded: 'rounded',
  ellipsis: 'ellipsis',
  firstLast: 'firstLast',
  previousNext: 'previousNext',
  icon: 'icon',
};
