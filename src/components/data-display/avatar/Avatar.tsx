import '@styles/avatar.css';

import AvatarFallbackIcon from '@assets/icons/ic_avatar.svg?react';
import { OverridableComponent } from '@models/types/OverridableComponent';
import classNames from 'classnames';
import * as React from 'react';

import { AvatarProps, AvatarTypeMap } from './Avatar.types';
import { avatarClasses as classes } from './avatarClasses';
import AvatarGroupContext from './AvatarGroupContext';
import { useLoaded } from './useLoaded';

export const Avatar = React.forwardRef(function Avatar<
  RootComponentType extends React.ElementType,
>(props: AvatarProps<RootComponentType>, ref: React.ForwardedRef<Element>) {
  const avatarGroup = React.useContext(AvatarGroupContext);

  const {
    alt,
    children: childrenProp,
    className,
    style,
    component: componentProp = 'div',
    sizes,
    src,
    srcSet,
    imgProps,
    size: sizeProp = 'md',
    variant: variantProp = 'circular',
    ...other
  } = props;
  const RootComponent =
    (props.component as any) || avatarGroup?.component || componentProp;
  const size = props.size || avatarGroup?.size || sizeProp;
  const variant = props.variant || avatarGroup?.variant || variantProp;

  let children = null;
  const loaded = useLoaded({ ...imgProps, src, srcSet });
  const hasImg = Boolean(src || srcSet);
  const hasImgNotFailing = hasImg && loaded !== 'error';

  if (hasImgNotFailing) {
    children = (
      <img
        alt={loaded === 'error' ? alt : undefined}
        srcSet={srcSet}
        src={src}
        sizes={sizes}
        className={classes.img}
        {...imgProps}
      />
    );
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <AvatarFallbackIcon className={classes.fallback} />;
  }

  const rootClassName = classNames(
    classes.root,
    {
      // colorDefault
      [classes.colorDefault]: !hasImgNotFailing,
      // variant
      [classes.circular]: variant === 'circular',
      [classes.rounded]: variant === 'rounded',
      [classes.square]: variant === 'square',
      // size
      [classes.sizeSmall]: size === 'sm',
      [classes.sizeMedium]: size === 'md',
      [classes.sizeLarge]: size === 'lg',
    },
    className,
  );

  const rootStyle: React.CSSProperties = {
    ...(typeof size === 'number'
      ? { width: `${size}px`, height: `${size}px`, fontSize: `${size / 2}px` }
      : {}),
    ...style,
  };

  return (
    <RootComponent className={rootClassName} ref={ref} style={rootStyle} {...other}>
      {children}
    </RootComponent>
  );
}) as OverridableComponent<AvatarTypeMap>;
