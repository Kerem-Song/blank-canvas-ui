import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  /** 루트 요소에 적용된 스타일. */
  root: 'wrapper',
  /** 체크박스 요소에 적용되는 클래스 이름입니다. */
  checkbox: 'checkbox',
  /** 입력 요소에 적용되는 클래스 이름입니다. */
  input: 'input',
  /** 라벨 요소에 적용되는 클래스 이름입니다. */
  label: 'label',
  /** 입력 구성 요소의 `checked` 클래스에 적용되는 상태 클래스입니다. */
  checked: 'checked',
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: 'disabled',
  /** `indeterminate={true}`인 경우 루트 요소에 적용되는 상태 클래스입니다. */
  indeterminate: 'indeterminate',
  /** `color="primary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorPrimary: 'primary',
  /** `color="secondary"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorSecondary: 'secondary',
  /** `color="success"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorSuccess: 'success',
  /** `color="error"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorError: 'error',
  /** `color="info"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorInfo: 'info',
  /** `color="warning"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorWarning: 'warning',
  /** `color="dark"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  colorDark: 'dark',
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: 'sm',
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: 'md',
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: 'lg',
} as const;

export const checkboxClasses = attachPrefixClasses(classes, 'checkbox', false);

export type CheckboxClasses = typeof checkboxClasses;
