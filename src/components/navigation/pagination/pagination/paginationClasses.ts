export interface PaginationClasses {
  /** 루트 엘리먼트에 적용되는 스타일. */
  root: string;
  /** ul 요소에 적용된 스타일. */
  ul: string;
  /** `variant="contained"`일 때 루트 엘리먼트에 적용되는 스타일. */
  contained: string;
  /** `variant="text"`일 때 루트 엘리먼트에 적용되는 스타일. */
  text: string;
  /** `variant="outlined"`일 때 루트 엘리먼트에 적용되는 스타일. */
  outlined: string;
}

export type PaginationClassKey = keyof PaginationClasses;

export const paginationClasses: PaginationClasses = {
  root: '',
  ul: 'ui',
  contained: 'contained',
  text: 'text',
  outlined: 'outlined',
};
