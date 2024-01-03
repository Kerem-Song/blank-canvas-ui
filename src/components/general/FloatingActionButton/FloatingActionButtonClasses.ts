export interface IFloatingActionButtonClasses {
  root: string;
  disabled: string;
  icon: string;
  circle: string;
  square: string;
  triggerClick: string;
  triggerHover: string;
  badgeCounter: string;
  isGroup: string;
}

export type FloatingActionButtonClassesKey = keyof IFloatingActionButtonClasses;

export const floatingActionButtonClasses: IFloatingActionButtonClasses = {
  root: '',
  disabled: 'disabled',
  icon: 'icon',
  circle: 'circle',
  square: 'square',
  triggerClick: 'trigger-click',
  triggerHover: 'trigger-hover',
  badgeCounter: 'badge-counter',
  isGroup: 'group',
};
