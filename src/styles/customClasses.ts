import { attachPrefixClasses } from '@modules/utils';
import classNames from 'classnames';

export interface ICustomClass {
  base: string;
  rounded?: boolean;
}

export const classes = {
  rounded: 'rounded',
  text: {
    primary: { main: 'main', light: 'light', dark: 'dark' },
    secondary: { main: 'main', light: 'light', dark: 'dark' },
  },
  bg: {
    primary: { main: 'main', light: 'light', dark: 'dark' },
    secondary: { main: 'main', light: 'light', dark: 'dark' },
  },
  border: {
    primary: { main: 'main', light: 'light', dark: 'dark' },
    secondary: { main: 'main', light: 'light', dark: 'dark' },
  },
};

export const customClasses = attachPrefixClasses(classes, 'custom');
