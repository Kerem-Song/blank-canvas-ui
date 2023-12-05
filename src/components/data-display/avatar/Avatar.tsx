import AvatarFallbackIcon from '@assets/icons/ic_avatar.svg?react';
import { OverridableComponent } from '@models/types';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import React from 'react';

import { AvatarProps, AvatarTypeMap } from './Avatar.types';
import { avatarClasses } from './avatarClasses';
import { useLoaded } from './useLoaded';

export const Avatar = React.forwardRef(function Avatar<
  RootComponentType extends React.ElementType,
>(props: AvatarProps<RootComponentType>, ref: React.ForwardedRef<Element>) {
  const {
    alt,
    children: childrenProp,
    className,
    style,
    component: RootComponent = 'div',
    imgProps,
    size = 'md',
    sizes,
    src,
    srcSet,
    prefix,
    variant = 'circular',
    ...other
  } = props;

  let children = null;
  const loaded = useLoaded({ ...imgProps, src, srcSet });
  const hasImg = Boolean(src || srcSet);
  const hasImgNotFailing = hasImg && loaded !== 'error';

  const classes = generatePrefixClasses(
    avatarClasses,
    `${prefix ? `${prefix}-` : ''}avatar`,
  );

  if (hasImgNotFailing) {
    children = (
      <img
        // alt={loaded === 'error' ? alt : undefined}
        alt={alt}
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
