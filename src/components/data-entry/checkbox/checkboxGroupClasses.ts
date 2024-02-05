import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  /** 루트 요소에 적용된 스타일. */
  root: 'wrapper',
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: 'disabled',
} as const;

export const checkboxGroupClasses = attachPrefixClasses(classes, 'checkbox-group', false);

export type CheckboxGroupClasses = typeof checkboxGroupClasses;
