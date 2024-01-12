import { generatePrefixClasses } from '@modules/utils';

const classes = {
  wrap: 'table-wrap',
  table: 'table',
};

export const tableClasses = generatePrefixClasses(classes, 'table');
