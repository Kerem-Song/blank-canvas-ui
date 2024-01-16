import '@styles/pagination.css';

import classNames from 'classnames';
import * as React from 'react';

import { PaginationItem } from '../pagination-item/PaginationItem';
import { usePagination } from '../usePagination/usePagination';
import { PaginationItemType } from '../usePagination/usePagination.types';
import { PaginationProps } from './Pagination.types';
import { paginationClasses as classes } from './paginationClasses';

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
    boundaryCount,
    total,
    defaultPage,
    disabled,
    hideEllipsis,
    hideNextButton,
    hidePrevButton,
    page,
    perPage,
    showFirstButton,
    showLastButton,
    maxPageCount,
    className,
    color = 'primary',
    shape = 'round',
    size = 'md',
    variant = 'contained',
    onChange,
    renderItem = (item) => <PaginationItem {...item} />,
    ...other
  } = props;

  const { items } = usePagination({
    boundaryCount,
    total,
    defaultPage,
    disabled,
    hideEllipsis,
    hideNextButton,
    hidePrevButton,
    page,
    perPage,
    showFirstButton,
    showLastButton,
    maxPageCount,
    onChange,
  });

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
