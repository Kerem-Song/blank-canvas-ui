import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  root: '',
  wrapper: 'wrapper',
  header: {
    root: '',
    label: { root: '', content: 'content' },
    expandIcon: 'expand-icon',
  },
  children: 'children',
} as const;

export const collapseClasses = attachPrefixClasses(classes, 'collapse', true);
