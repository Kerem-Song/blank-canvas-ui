import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import { composeRef } from '@modules/utils';

import { ButtonBaseTypeMap, ButtonBaseProps, ExtendButtonBase } from './ButtonBase.types';

/**
 * `ButtonBase`에는 가능한 한 적은 수의 스타일이 포함됩니다.
 * 버튼을 만들기 위한 간단한 빌딩 블록을 목표로 합니다.
 */
const ButtonBase = React.forwardRef(function ButtonBase<
  BaseComponentType extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
>(props: ButtonBaseProps<BaseComponentType>, ref: React.ForwardedRef<any>) {
  const {
    children,
    className,
    component = 'button',
    disabled = false,
    LinkComponent = 'a',
    tabIndex = 0,
    type,
    prefixClasses = 'luna-button-base',
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onMouseLeave,
    onMouseDown,
    ...other
  } = props;

  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [elementTagName, setElementTagName] = useState<string>('');

  const updateElementTagName = (instance: HTMLElement | null) => {
    setElementTagName(instance?.tagName ?? '');
  };
  const handleRef = composeRef(updateElementTagName, buttonRef, ref);

  const handleClick = (event: React.MouseEvent) => {
    if (!disabled) {
      onClick?.(event);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    onMouseLeave?.(event);

    if (isActive) {
      setIsActive(false);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    onMouseDown?.(event);

    if (!disabled) {
      setIsActive(true);
      document.addEventListener(
        'mouseup',
        () => {
          setIsActive(false);
        },
        { once: true },
      );
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    onFocus?.(event);

    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }

    if (!isFocus) {
      setIsFocus(true);
    }
  };

  const handleBlur = (event: React.FocusEvent) => {
    onBlur?.(event);
    setIsFocus(false);

    if (isActive) {
      setIsActive(false);
    }
  };

  const isNativeButton = () => {
    const button = buttonRef.current;

    return (
      elementTagName === 'BUTTON' ||
      (elementTagName === 'INPUT' &&
        ['button', 'submit', 'reset'].includes((button as HTMLInputElement)?.type)) ||
      (elementTagName === 'A' && (button as HTMLAnchorElement)?.href)
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    onKeyDown?.(event);

    if (event.target === event.currentTarget && !isNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
      setIsActive(true);
    }

    // 상호작용이 안되는 요소에서의 키보드 접근
    if (
      event.target === event.currentTarget &&
      !isNativeButton() &&
      event.key === 'Enter' &&
      !disabled
    ) {
      onClick?.(event);
      event.preventDefault();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    onKeyUp?.(event);

    if (event.target === event.currentTarget) {
      setIsActive(false);
    }

    // 상호작용이 안되는 요소에서의 키보드 접근
    if (
      event.target === event.currentTarget &&
      !isNativeButton() &&
      event.key === ' ' &&
      !disabled
    ) {
      onClick?.(event);
    }
  };

  let ComponentProp: any = component;
  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }

  const buttonProps: {
    type?:
      | React.ButtonHTMLAttributes<HTMLButtonElement>['type']
      | React.AnchorHTMLAttributes<HTMLAnchorElement>['type'];
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
      buttonProps['aria-disabled'] = disabled as boolean;
      buttonProps.tabIndex = disabled ? tabIndex ?? 0 : -1;
    }
  }

  const classes = classNames(
    prefixClasses,
    {
      [`${prefixClasses}-active`]: !disabled && isActive,
      [`${prefixClasses}-focus`]: !disabled && isFocus,
      [`${prefixClasses}-disabled`]: disabled,
    },
    className,
  );

  return (
    <ComponentProp
      type={type}
      className={classes}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={handleRef}
      {...buttonProps}
      {...other}
    >
      {children}
    </ComponentProp>
  );
}) as ExtendButtonBase<ButtonBaseTypeMap>;

export default ButtonBase;
