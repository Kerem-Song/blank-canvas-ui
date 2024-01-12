import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  root: '',
  opacity30: 'opacity-30',
  opacity50: 'opacity-50',
  opacity70: 'opacity-70',
  opacity100: 'opacity-100',
  btnSquare: 'btn-square',
  btnCircle: 'btn-circle',
} as const;

export const carouselClasses = attachPrefixClasses(classes, 'carousel');
