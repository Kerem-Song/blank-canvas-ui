export interface CheckboxGroupClasses {
  /** 루트 요소에 적용된 스타일. */
  root: string;
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: string;
}

export type CheckboxGroupClassKey = keyof CheckboxGroupClasses;

export const checkboxGroupClasses: CheckboxGroupClasses = {
  root: 'wrapper',
  disabled: 'disabled',
};
