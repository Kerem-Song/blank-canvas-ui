import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  root: '',
  wrapper: 'wrapper',
  header: {
    root: 'header',
    label: { root: 'header-label', content: 'header-label-content' },
    expandIcon: 'header-expand-icon',
  },
  children: 'children',
} as const;

export const collapseClasses = attachPrefixClasses(classes, 'collapse');
