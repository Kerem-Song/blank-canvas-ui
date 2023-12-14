import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import * as React from 'react';

import { PaginationItem } from '../paginationItem/PaginationItem';
import { PaginationItemType } from '../paginationItem/PaginationItem.types';
import { usePagination } from '../usePagination/usePagination';
import { PaginationProps } from './Pagination.types';
import { paginationClasses } from './paginationClasses';

function defaultGetAriaLabel(
  type: PaginationItemType,
  page: number | null,
  selected: boolean,
) {
  return type === 'page'
    ? `${selected ? '' : 'Go to '}page ${page}`
    : `Go to ${type} page`;
}

export const Pagination = React.forwardRef(function Pagination(
  props: PaginationProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {
    boundaryCount = 1,
    className,
    color = 'primary',
    count = 1,
    defaultPage = 1,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    page,
    shape = 'round',
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    size = 'sm',
    variant = 'outlined',
    prefix,
    onChange,
    renderItem = (item) => <PaginationItem {...item} />,
    ...other
  } = props;

  const { items } = usePagination({
    boundaryCount,
    count,
    defaultPage,
    disabled,
    hideNextButton,
    hidePrevButton,
    page,
    showFirstButton,
    showLastButton,
    siblingCount,
    onChange,
  });

  const classes = generatePrefixClasses(
    paginationClasses,
    `${prefix ? `${prefix}-` : ''}Pagination`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // variant
      [classes.text]: variant === 'text',
      [classes.contained]: variant === 'contained',
      [classes.outlined]: variant === 'outlined',
    },
    className,
  );

  return (
    <nav
      aria-label="pagination navigation"
      className={rootClassName}
      ref={ref}
      {...other}
    >
      <ul className={classes.ul}>
        {items.map((item, index) => (
          <li key={index}>
            {renderItem({
              ...item,
              color,
              shape,
              size,
              variant,
              'aria-label': defaultGetAriaLabel(item.type, item.page, item.selected),
            })}
          </li>
        ))}
      </ul>
    </nav>
  );
});
