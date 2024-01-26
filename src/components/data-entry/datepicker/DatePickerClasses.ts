import { attachPrefixClasses } from '@modules/utils';

const classes = {
  wrap: 'wrap',
  calendar: {
    root: '',
    header: {
      wrap: '',
      title: 'title',
      buttonWrap: 'button-wrap',
    },
    weeknames: {
      wrap: 'wrap',
      item: 'item',
    },
    week: {
      root: '',
      day: {
        base: '',
        outOfMonth: 'outofmonth',
        selected: 'selected',
      },
    },
  },
};

export const datePickerClasses = attachPrefixClasses(classes, 'datepicker', true);
