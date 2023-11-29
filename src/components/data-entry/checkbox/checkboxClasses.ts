export interface CheckboxClasses {
  /** 루트 요소에 적용된 스타일. */
  root: string;
  /** 체크박스 요소에 적용되는 클래스 이름입니다. */
  checkbox: string;
  /** 입력 요소에 적용되는 클래스 이름입니다. */
  input: string;
  /** 라벨 요소에 적용되는 클래스 이름입니다. */
  label: string;
  /** 입력 구성 요소의 `checked` 클래스에 적용되는 상태 클래스입니다. */
  checked: string;
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: string;
  /** `indeterminate={true}`인 경우 루트 요소에 적용되는 상태 클래스입니다. */
  indeterminate: string;
  /** `color="primary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorPrimary: string;
  /** `color="success"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorSuccess: string;
  /** `color="secondary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorSecondary: string;
  /** `color="error"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorError: string;
  /** `color="info"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorInfo: string;
  /** `color="warning"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorWarning: string;
  /** `color="dark"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorDark: string;
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: string;
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: string;
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: string;
}

export type CheckboxClassKey = keyof CheckboxClasses;

export const checkboxClasses: CheckboxClasses = {
  root: 'wrapper',
  checkbox: 'checkbox',
  input: 'input',
  label: 'label',
  checked: 'checked',
  disabled: 'disabled',
  indeterminate: 'indeterminate',
  colorPrimary: 'primary',
  colorSecondary: 'secondary',
  colorSuccess: 'success',
  colorError: 'error',
  colorInfo: 'info',
  colorWarning: 'warning',
  colorDark: 'dark',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
};
