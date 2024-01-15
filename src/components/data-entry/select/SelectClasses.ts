import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  disabled: 'disabled',
  container: 'container',
  focus: {
    root: '',
    focusNone: 'focus-none',
  },
  status: {
    error: 'error',
    warning: 'warning',
  },
  bordered: {
    root: '',
    borderedNone: 'bordered-none',
  },
  referenceElement: 'referenceElement',
  icon: 'icon',
  list: {
    root: '',
    overflow: 'overflow',
    item: 'item',
    hover: 'hover',
    disabled: 'disabled',
  },
};
export const selectClasses = attachPrefixClasses(classes, 'select');
