export interface SwitchClasses {
  root: string;
  inside: string;
  outside: string;
  green: string;
  blue: string;
  sizeSmall: string;
  sizeMedium: string;
  sizeLarge: string;
  sizeXLarge: string;
}

export type SwitchClasskey = keyof SwitchClasses;

export const switchClasses: SwitchClasses = {
  root: '',
  inside: 'inside',
  outside: 'outside',
  green: 'green',
  blue: 'blue',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
  sizeXLarge: 'xl',
};
