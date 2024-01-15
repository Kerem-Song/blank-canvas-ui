import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  shape: {
    root: '',
    inside: 'inside',
    outside: 'outside',
  },
  size: {
    root: '',
    small: 'sm',
    medium: 'md',
    large: 'lg',
    xLarge: 'xl',
  },
  color: {
    root: '',
    green: 'green',
    blue: 'blue',
  },
  wrapper: 'wrapper',
  input: 'input',
  bar: 'bar',
} as const;

export const switchClasses = attachPrefixClasses(classes, 'switch', true);
