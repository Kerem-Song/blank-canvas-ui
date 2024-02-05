import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  /** 루트 엘리먼트에 적용되는 스타일. */
  root: '',
  /** ul 요소에 적용된 스타일. */
  ul: 'ui',
  /** `variant="contained"`일 때 루트 엘리먼트에 적용되는 스타일. */
  contained: 'contained',
  /** `variant="text"`일 때 루트 엘리먼트에 적용되는 스타일. */
  text: 'text',
  /** `variant="outlined"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlined: 'outlined',
};

export const paginationClasses = attachPrefixClasses(classes, 'pagination', false);

export type PaginationClasses = typeof paginationClasses;
