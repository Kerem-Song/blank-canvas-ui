import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  root: '',
  opacity: {
    op30: 'opacity-30',
    op50: 'opacity-50',
    op70: 'opacity-70',
    op100: 'opacity-100',
  },
  btn: {
    root: 'btn',
    shape: {
      square: 'btn-square',
      circle: 'btn-circle',
    },
  },
  page: 'page',
  component: 'component',
  contentWrapper: 'content-wrapper',
  dots: 'dots',
  dotsBtn: 'dots-button',
  arrowBtnWrapper: 'arrow-btn-wrapper',
} as const;

export const carouselClasses = attachPrefixClasses(classes, 'carousel');
