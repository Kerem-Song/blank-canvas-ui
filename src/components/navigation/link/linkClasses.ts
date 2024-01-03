export interface LinkClasses {
  /** 루트 요소에 적용된 스타일. */
  root: string;
  /** 루트 요소에 적용된 스타일. `disabled="true"` */
  disabled: string;
  /** 루트 요소에 적용된 스타일. `overlay="true"` */
  overlay: string;
  /** `underline="none"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  underlineNone: string;
  /** `underline="hover"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  underlineHover: string;
  /** `underline="always"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  underlineAlways: string;
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
  /** `size="xs"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeXSmall: string;
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: string;
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: string;
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: string;
}

export type LinkClassKey = keyof LinkClasses;

export const linkClasses: LinkClasses = {
  root: '',
  disabled: 'disabled',
  overlay: 'overlay',
  underlineNone: 'underline-none',
  underlineHover: 'underline-hover',
  underlineAlways: 'underline-always',
  colorPrimary: 'primary',
  colorSecondary: 'secondary',
  colorSuccess: 'success',
  colorError: 'error',
  colorInfo: 'info',
  colorWarning: 'warning',
  colorDark: 'dark',
  sizeXSmall: 'xs',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
};
