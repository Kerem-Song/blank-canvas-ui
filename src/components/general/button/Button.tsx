import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import { composeRef, generatePrefixClasses } from '@modules/utils';

import { ButtonProps, ExtendButton, ButtonTypeMap } from './Button.types';
import buttonClasses from './buttonClasses';

const Button = React.forwardRef(function ButtonBase<
  RootComponentType extends React.ElementType,
>(props: ButtonProps<RootComponentType>, ref: React.ForwardedRef<Element>) {
  const {
    children,
    className,
    color = 'default',
    component = 'button',
    disabled = false,
    endIcon: endIconProp,
    shape = 'default',
    size = 'medium',
    startIcon: startIconProp,
    slotClassNames,
    slotStyles,
    tabIndex,
    type,
    prefix = 'luna-btn',
    variant = 'outlined',
    onClick,
    ...other
  } = props;

  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const [elementTagName, setElementTagName] = useState<string>('');

  const updateElementTagName = (instance: HTMLElement | null) => {
    setElementTagName(instance?.tagName ?? '');
  };
  const handleRef = composeRef(updateElementTagName, buttonRef, ref);

  let RootComponent: any = component;

  // `href` 또는 `to` prop가 제공될 때 링크를 렌더링하는 데 사용되는 구성 요소.
  if (RootComponent === 'button' && (other.href || other.to)) {
    RootComponent = 'a';
  }

  const buttonProps: {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: boolean;
    role?: React.AriaRole;
    'aria-disabled'?: React.AriaAttributes['aria-disabled'];
    tabIndex?: number;
  } = {};

  if (tabIndex !== undefined) {
    buttonProps.tabIndex = tabIndex;
  }

  if (elementTagName === 'BUTTON') {
    buttonProps.type = type ?? 'button';
    buttonProps.disabled = disabled;
  } else if (elementTagName !== '') {
    if (!other.href && !other.to) {
      buttonProps.role = 'button';
      buttonProps.tabIndex = tabIndex ?? 0;
    }
    if (disabled) {
      buttonProps.tabIndex = disabled ? tabIndex ?? 0 : -1;
    }
  }

  const classes = generatePrefixClasses(buttonClasses, prefix ?? '');

  const rootClassName = classNames(
    classes.root,
    {
      // disabled
      [classes.disabled]: disabled,
      // variant
      [classes.contained]: variant === 'contained',
      [classes.outlined]: variant === 'outlined',
      [classes.text]: variant === 'text',
      // color
      [classes.colorPrimary]: color === 'primary',
      [classes.colorSecondary]: color === 'secondary',
      [classes.colorSuccess]: color === 'success',
      [classes.colorError]: color === 'error',
      [classes.colorInfo]: color === 'info',
      [classes.colorWarning]: color === 'warning',
      [classes.colorDark]: color === 'dark',
      [classes.colorLight]: color === 'light',
      // shape
      [classes.shapeCircle]: shape === 'circle',
      [classes.shapeRound]: shape === 'round',
      // size
      [classes.sizeSmall]: size === 'small',
      [classes.sizeMedium]: size === 'medium',
      [classes.sizeLarge]: size === 'large',
    },
    className,
  );

  const startIcon = startIconProp && (
    <span
      className={classNames(classes.startIcon, `icon-${size}`, slotClassNames?.icon)}
      style={slotStyles?.icon}
    >
      {startIconProp}
    </span>
  );

  const endIcon = endIconProp && (
    <span
      className={classNames(classes.endIcon, `icon-${size}`, slotClassNames?.icon)}
      style={slotStyles?.icon}
    >
      {endIconProp}
    </span>
  );

  return (
    <RootComponent
      type={type}
      className={rootClassName}
      onClick={disabled ? undefined : onClick}
      ref={handleRef}
      {...buttonProps}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
    </RootComponent>
  );
});

Button.displayName = 'general.Button';

export default Button as ExtendButton<ButtonTypeMap>;
