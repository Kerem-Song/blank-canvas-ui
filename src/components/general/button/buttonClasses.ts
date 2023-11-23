export interface ButtonClasses {
  /** 루트 요소에 적용된 스타일. */
  root: string;
  /** 루트 요소에 적용된 스타일. `disabled="true"` */
  disabled: string;
  /** 루트 요소에 적용된 스타일. `block="true"` */
  block: string;
  /** 루트 요소에 적용된 스타일 `variant="text"`. */
  text: string;
  /** 루트 요소에 적용된 스타일 `variant="outlined"`. */
  outlined: string;
  /** 루트 요소에 적용된 스타일 `variant="dashed"`. */
  contained: string;
  /** 루트 요소에 적용된 스타일 `variant="outlined"`. */
  dashed: string;
  /** 루트 요소에 적용된 스타일 `color="primary"`. */
  colorPrimary: string;
  /** 루트 요소에 적용된 스타일 `color="secondary"`. */
  colorSecondary: string;
  /** 루트 요소에 적용된 스타일 `color="success"`. */
  colorSuccess: string;
  /** 루트 요소에 적용된 스타일 `color="error"`. */
  colorError: string;
  /** 루트 요소에 적용된 스타일 `color="info"`. */
  colorInfo: string;
  /** 루트 요소에 적용된 스타일 `color="warning"`. */
  colorWarning: string;
  /** 루트 요소에 적용된 스타일 `color="dark"`. */
  colorDark: string;
  /** 루트 요소에 적용된 스타일 `shape="circle"`. */
  shapeCircle: string;
  /** 루트 요소에 적용된 스타일 `shape="round"`. */
  shapeRound: string;
  /** 루트 요소에 적용된 스타일 `size="xs"`. */
  sizeXSmall: string;
  /** 루트 요소에 적용된 스타일 `size="sm"`. */
  sizeSmall: string;
  /** 루트 요소에 적용된 스타일 `size="md"`. */
  sizeMedium: string;
  /** 루트 요소에 적용된 스타일 `size="lg"`. */
  sizeLarge: string;
  /** 제공된 경우 startIcon 요소에 스타일이 적용됩니다. */
  startIcon: string;
  /** 제공된 경우 endIcon 요소에 스타일이 적용됩니다. */
  endIcon: string;
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="xs"`입니다. */
  iconSizeXSmall: string;
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="sm"`입니다. */
  iconSizeSmall: string;
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="md"`입니다. */
  iconSizeMedium: string;
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="lg"`입니다. */
  iconSizeLarge: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export const buttonClasses: ButtonClasses = {
  root: '',
  disabled: 'disabled',
  block: 'block',
  text: 'text',
  outlined: 'outlined',
  contained: 'contained',
  dashed: 'dashed',
  colorPrimary: 'primary',
  colorSecondary: 'secondary',
  colorSuccess: 'success',
  colorError: 'error',
  colorInfo: 'info',
  colorWarning: 'warning',
  colorDark: 'dark',
  shapeCircle: 'circle',
  shapeRound: 'round',
  sizeXSmall: 'xs',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
  startIcon: 'start-icon',
  endIcon: 'end-icon',
  iconSizeXSmall: 'icon-xs',
  iconSizeSmall: 'icon-sm',
  iconSizeMedium: 'icon-md',
  iconSizeLarge: 'icon-lg',
};
