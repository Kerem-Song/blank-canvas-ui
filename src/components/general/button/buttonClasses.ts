export interface ButtonClasses {
  /** 루트 요소에 적용된 스타일. */
  root: string;
  /** 루트 요소에 적용된 스타일. `disabled="true"` */
  disabled: string;
  /** 루트 요소에 적용된 스타일 `variant="text"`. */
  text: string;
  /** 루트 요소에 적용된 스타일 `variant="outlined"`. */
  outlined: string;
  /** 루트 요소에 적용된 스타일 `variant="outlined"`. */
  contained: string;
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
  /** 루트 요소에 적용된 스타일 `color="light"`. */
  colorLight: string;
  /** 루트 요소에 적용된 스타일 `shape="circle"`. */
  shapeCircle: string;
  /** 루트 요소에 적용된 스타일 `shape="round"`. */
  shapeRound: string;
  /** 루트 요소에 적용된 스타일 `size="small"`. */
  sizeSmall: string;
  /** 루트 요소에 적용된 스타일 `size="medium"`. */
  sizeMedium: string;
  /** 루트 요소에 적용된 스타일 `size="large"`. */
  sizeLarge: string;
  /** 제공된 경우 startIcon 요소에 스타일이 적용됩니다. */
  startIcon: string;
  /** 제공된 경우 endIcon 요소에 스타일이 적용됩니다. */
  endIcon: string;
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="small"`입니다. */
  iconSizeSmall: string;
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="medium"`입니다. */
  iconSizeMedium: string;
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="large"`입니다. */
  iconSizeLarge: string;
}

export type ButtonClassKey = keyof ButtonClasses;

const buttonClasses: ButtonClasses = {
  root: 'root',
  disabled: 'disabled',
  text: 'text',
  outlined: 'outlined',
  contained: 'contained',
  colorPrimary: 'primary',
  colorSecondary: 'secondary',
  colorSuccess: 'success',
  colorError: 'error',
  colorInfo: 'info',
  colorWarning: 'warning',
  colorDark: 'dark',
  colorLight: 'light',
  shapeCircle: 'circle',
  shapeRound: 'round',
  sizeSmall: 'small',
  sizeMedium: 'medium',
  sizeLarge: 'large',
  startIcon: 'start-icon',
  endIcon: 'end-icon',
  iconSizeSmall: 'icon-small',
  iconSizeMedium: 'icon-medium',
  iconSizeLarge: 'icon-large',
};

export default buttonClasses;
