import * as React from 'react';
import { OverridableComponent } from '@models/types/OverridableComponent';
import classNames from 'classnames';

import { LinkProps, LinkTypeMap } from './Link.types';
import { linkClasses as classes } from './linkClasses';

import '@styles/link.css';

export const Link = React.forwardRef(function Link<
  RootComponentType extends React.ElementType,
>(props: LinkProps<RootComponentType>, ref: React.ForwardedRef<Element>) {
  const {
    children,
    className,
    color = 'primary',
    overlay = false,
    disabled = false,
    underline = 'always',
    size = 'md',
    href,
    component: RootComponent = 'a',
    ...other
  } = props;

  const rootClassName = classNames(
    classes.root,
    {
      // overlay
      [classes.overlay]: overlay,
      // disabled
      [classes.disabled]: disabled,
      // underline
      [classes.underlineNone]: underline === 'none',
      [classes.underlineHover]: underline === 'hover',
      [classes.underlineAlways]: underline === 'always',
      // color
      [classes.colorPrimary]: color === 'primary',
      [classes.colorSuccess]: color === 'success',
      [classes.colorSecondary]: color === 'secondary',
      [classes.colorError]: color === 'error',
      [classes.colorInfo]: color === 'info',
      [classes.colorWarning]: color === 'warning',
      [classes.colorDark]: color === 'dark',
      // size
      [classes.sizeXSmall]: size === 'xs',
      [classes.sizeSmall]: size === 'sm',
      [classes.sizeMedium]: size === 'md',
      [classes.sizeLarge]: size === 'lg',
    },
    className,
  );

  return (
    <RootComponent
      className={rootClassName}
      ref={ref}
      href={disabled ? undefined : href}
      {...other}
    >
      {children}
    </RootComponent>
  );
}) as OverridableComponent<LinkTypeMap>;
