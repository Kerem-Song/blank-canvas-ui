import ChevronDoubleLeftIcon from '@assets/icons/ic_chevron_double_left.svg?react';
import ChevronDoubleRightIcon from '@assets/icons/ic_chevron_double_right.svg?react';
import ChevronLeftIcon from '@assets/icons/ic_chevron_left.svg?react';
import ChevronRightIcon from '@assets/icons/ic_chevron_right.svg?react';
import { Button } from '@components/general/button/Button';
import { OverridableComponent } from '@models/types';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import * as React from 'react';

import { PaginationItemType } from '../usePagination/usePagination.types';
import { PaginationItemProps, PaginationItemTypeMap } from './PaginationItem.types';
import { paginationItemClasses } from './paginationItemClasses';

export const PaginationItem = React.forwardRef(function PaginationItem<
  RootComponentType extends React.ElementType,
>(props: PaginationItemProps<RootComponentType>, ref: React.ForwardedRef<Element>) {
  const {
    className,
    component: componentProp = 'button',
    disabled = false,
    page,
    selected = false,
    color = 'default',
    shape = 'round',
    variant = 'contained',
    size = 'md',
    slots: slotsProp = {},
    slotProps: slotPropsProp = {},
    prefix,
    type = 'page',
    ...other
  } = props;

  const iconSlots: Partial<Record<PaginationItemType, React.ElementType>> = {
    previous: slotsProp.previous || ChevronLeftIcon,
    next: slotsProp.next || ChevronRightIcon,
    first: slotsProp.first || ChevronDoubleLeftIcon,
    last: slotsProp.last || ChevronDoubleRightIcon,
  };
  const ellipsisSlots: Partial<Record<PaginationItemType, React.ElementType>> = {
    'start-ellipsis': slotsProp['start-ellipsis'],
    'end-ellipsis': slotsProp['end-ellipsis'],
  };
  const slotProps: Partial<
    Record<PaginationItemType, Partial<React.ComponentPropsWithRef<React.ElementType>>>
  > = slotPropsProp;

  const Icon = iconSlots[type];
  const PaginationItemEllipsis = ellipsisSlots[type] || 'div';
  const PaginationItemPage = Button;

  const classes = generatePrefixClasses(
    paginationItemClasses,
    `${prefix ? `${prefix}-` : ''}pagination-item`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // selected
      [classes.selected]: selected,
      // disabled
      [classes.disabled]: disabled,
      // variant
      [classes.text]: variant === 'text',
      [classes.contained]: variant === 'contained',
      [classes.outlined]: variant === 'outlined',
      // shape
      [classes.shapeCircle]: shape === 'circle',
      [classes.shapeRound]: shape === 'round',
      // color
      [classes.textPrimary]: variant === 'text' && color === 'primary',
      [classes.textSecondary]: variant === 'text' && color === 'secondary',
      [classes.containedPrimary]: variant === 'contained' && color === 'primary',
      [classes.containedSecondary]: variant === 'contained' && color === 'secondary',
      [classes.outlinedPrimary]: variant === 'outlined' && color === 'primary',
      [classes.outlinedSecondary]: variant === 'outlined' && color === 'secondary',
      // size
      [classes.sizeSmall]: size === 'sm',
      [classes.sizeMedium]: size === 'md',
      [classes.sizeLarge]: size === 'lg',
    },
    ((slotProps[type] ?? {}) as HTMLElement).className,
    className,
  );

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <PaginationItemEllipsis
      {...slotProps[type]}
      ref={ref}
      className={classNames(rootClassName, classes.ellipsis)}
    >
      …
    </PaginationItemEllipsis>
  ) : (
    <PaginationItemPage
      ref={ref}
      component={componentProp}
      disabled={disabled}
      className={classNames(rootClassName, {
        [classes.page]: type === 'page',
        [classes.firstLast]: type === 'first' || type === 'last',
        [classes.previousNext]: type === 'previous' || type === 'next',
      })}
      baseButton
      {...other}
    >
      {type === 'page' && page}
      {Icon ? <Icon {...slotProps[type]} className={classes.icon} /> : null}
    </PaginationItemPage>
  );
}) as OverridableComponent<PaginationItemTypeMap>;
