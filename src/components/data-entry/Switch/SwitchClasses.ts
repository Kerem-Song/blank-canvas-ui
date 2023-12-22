export interface SwitchClasses {
  root: string;
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
  green: 'green',
  blue: 'blue',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
  sizeXLarge: 'xl',
};
