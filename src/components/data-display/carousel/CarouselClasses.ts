import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

export const classes = {
  root: '',
  opacity: {
    op30: '30',
    op50: '50',
    op70: '70',
    op100: '100',
  },
  btn: {
    root: '',
    shape: {
      square: 'square',
      circle: 'circle',
    },
  },
  page: 'page',
  component: 'component',
  contentWrapper: 'content-wrapper',
  dots: 'dots',
  dotsBtn: 'dots-button',
  arrowBtnWrapper: 'arrow-btn-wrapper',
} as const;

export const carouselClasses = attachPrefixClasses(classes, 'carousel', true);
