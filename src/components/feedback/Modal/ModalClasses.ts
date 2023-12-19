export interface IModalClasses {
  root: string;
  sizeSmall: string;
  sizeMedium: string;
  sizeLarge: string;
}

export type ModalClassKey = keyof IModalClasses;

export const modalClasses: IModalClasses = {
  root: '',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
};
