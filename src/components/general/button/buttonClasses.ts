import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  /** 루트 요소에 적용된 스타일. */
  root: '',
  baseButton: 'base-button',
  /** 루트 요소에 적용된 스타일. `disabled="true"` */
  disabled: 'disabled',
  /** 루트 요소에 적용된 스타일. `block="true"` */
  block: 'block',
  /** 루트 요소에 적용된 스타일 `variant="text"`. */
  text: 'text',
  /** 루트 요소에 적용된 스타일 `variant="outlined"`. */
  outlined: 'outlined',
  /** 루트 요소에 적용된 스타일 `variant="contained"`. */
  contained: 'contained',
  /** 루트 요소에 적용된 스타일 `variant="dashed"`. */
  dashed: 'dashed',
  /** 루트 요소에 적용된 스타일 `color="primary"`. */
  colorPrimary: 'primary',
  /** 루트 요소에 적용된 스타일 `color="secondary"`. */
  colorSecondary: 'secondary',
  /** 루트 요소에 적용된 스타일 `color="success"`. */
  colorSuccess: 'success',
  /** 루트 요소에 적용된 스타일 `color="error"`. */
  colorError: 'error',
  /** 루트 요소에 적용된 스타일 `color="info"`. */
  colorInfo: 'info',
  /** 루트 요소에 적용된 스타일 `color="warning"`. */
  colorWarning: 'warning',
  /** 루트 요소에 적용된 스타일 `color="dark"`. */
  colorDark: 'dark',
  /** 루트 요소에 적용된 스타일 `shape="circle"`. */
  shapeCircle: 'circle',
  /** 루트 요소에 적용된 스타일 `shape="round"`. */
  shapeRound: 'round',
  /** 루트 요소에 적용된 스타일 `size="xs"`. */
  sizeXSmall: 'xs',
  /** 루트 요소에 적용된 스타일 `size="sm"`. */
  sizeSmall: 'sm',
  /** 루트 요소에 적용된 스타일 `size="md"`. */
  sizeMedium: 'md',
  /** 루트 요소에 적용된 스타일 `size="lg"`. */
  sizeLarge: 'lg',
  /** 제공된 경우 startIcon 요소에 스타일이 적용됩니다. */
  startIcon: 'start-icon',
  /** 제공된 경우 endIcon 요소에 스타일이 적용됩니다. */
  endIcon: 'end-icon',
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="xs"`입니다. */
  iconSizeXSmall: 'icon-xs',
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="sm"`입니다. */
  iconSizeSmall: 'icon-sm',
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="md"`입니다. */
  iconSizeMedium: 'icon-md',
  /** 제공된 경우 아이콘 요소에 스타일이 적용되고 `size="lg"`입니다. */
  iconSizeLarge: 'icon-lg',
} as const;

export const buttonClasses = attachPrefixClasses(classes, 'btn', false);

export type ButtonClasses = typeof buttonClasses;
