import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  size: {
    root: '',
    small: 'sm',
    medium: 'md',
    large: 'lg',
    xLarge: 'xl',
  },
  title: 'title',
  content: 'content',
  children: 'children',
  btn: {
    root: '',
    cancel: 'cancel',
    confirm: 'confirm',
    custom: 'custom',
    esc: 'esc',
  },
  overlay: 'overlay',
} as const;

export const modalClasses = attachPrefixClasses(classes, 'modal', true);
