import { attachPrefixClasses } from '@modules/utils';

const classes = {
  wrap: 'wrap',
  calendar: 'calendar',
};

export const datePickerClasses = attachPrefixClasses(classes, 'datepicker', true);
