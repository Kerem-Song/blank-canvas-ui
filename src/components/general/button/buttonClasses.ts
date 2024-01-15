import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

export const classes = {
  root: '',
  baseButton: 'base-button',
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
} as const;

export const buttonClasses = attachPrefixClasses(classes, 'btn', true);
