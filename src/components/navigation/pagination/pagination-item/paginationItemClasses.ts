import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  /** 루트 엘리먼트에 적용되는 스타일. */
  root: '',
  /** `type="page"`일 때 루트 엘리먼트에 적용되는 스타일. */
  page: 'page',
  /** `size="sm"`일 때 루트 엘리먼트에 적용되는 스타일. */
  sizeSmall: 'sm',
  /** `size="md"`일 때 루트 엘리먼트에 적용되는 스타일. */
  sizeMedium: 'md',
  /** `size="lg"`일 때 루트 엘리먼트에 적용되는 스타일. */
  sizeLarge: 'lg',
  /** `disabled={true}`일 때 루트 엘리먼트에 적용되는 상태 클래스. */
  disabled: 'disabled',
  /** `selected={true}`일 때 루트 엘리먼트에 적용되는 상태 클래스. */
  selected: 'selected',
  /** 루트 요소에 적용된 스타일 `shape="circle"`. */
  shapeCircle: 'circle',
  /** 루트 요소에 적용된 스타일 `shape="round"`. */
  shapeRound: 'round',
  /** `variant="contained"`일 때 루트 엘리먼트에 적용되는 스타일. */
  contained: 'contained',
  /** `variant="contained"` 및 `color="primary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  containedPrimary: 'containedPrimary',
  /** `variant="contained"` 및 `color="secondary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  containedSecondary: 'containedSecondary',
  /** `variant="text"`일 때 루트 엘리먼트에 적용되는 스타일. */
  text: 'text',
  /** `variant="text"` 및 `color="primary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  textPrimary: 'textPrimary',
  /** `variant="text"` 및 `color="secondary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  textSecondary: 'textSecondary',
  /** `variant="outlined"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlined: 'outlined',
  /** `variant="outlined"` 및 `color="primary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlinedPrimary: 'outlinedPrimary',
  /** `variant="outlined"` 및 `color="secondary"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlinedSecondary: 'outlinedSecondary',
  /** `rounded="true"`일 때 루트 엘리먼트에 적용되는 스타일. */
  rounded: 'rounded',
  /** `type="start-ellipsis"` 또는 `type="end-ellipsis"`일 때 루트 엘리먼트에 적용되는 스타일. */
  ellipsis: 'ellipsis',
  /** `type="first"` 또는 `type="last"`일 때 루트 엘리먼트에 적용되는 스타일. */
  firstLast: 'firstLast',
  /** `type="previous"` 또는 `type="next"`일 때 루트 엘리먼트에 적용되는 스타일. */
  previousNext: 'previousNext',
  /** 표시할 아이콘에 적용되는 스타일. */
  icon: 'icon',
} as const;

export const paginationItemClasses = attachPrefixClasses(
  classes,
  'pagination-item',
  false,
);

export type PaginationItemClasses = typeof paginationItemClasses;
