import * as React from 'react';
import classNames from 'classnames';

import { AvatarTypeMap } from './Avatar.types';
import { AvatarGroupProps } from './AvatarGroup.types';
import { avatarGroupClasses as classes } from './avatarGroupClasses';
import AvatarGroupContext from './AvatarGroupContext';

import '@styles/avatarGroup.css';

/** 조건에 맞는 아바타 뽑기 */
export function clampAvatars(
  avatars: Array<Omit<AvatarTypeMap['props'], 'children'>>,
  options: {
    /**
     * +{max} 표시할 최대 아바타 수입니다.
     * @default 5
     */
    max?: number;
    /**
     * 총 아바타 수입니다. 추가 아바타 수를 계산하는 데 사용됩니다.
     * @default avatars.length
     */
    total?: number;
  } = { max: 5 },
) {
  const { max = 5, total } = options;

  let clampedMax = max < 2 ? 2 : max;
  const totalAvatars = total || avatars.length;

  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }

  clampedMax = Math.min(totalAvatars + 1, clampedMax);
  const maxAvatars = Math.min(avatars.length, clampedMax - 1);
  const surplus = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);

  return { avatars: avatars.slice(0, maxAvatars), surplus };
}

/**
 * 여러 아바타를 그룹화하려면 아바타 그룹 구성요소를 사용하세요.
 */
export const AvatarGroup = React.forwardRef(function AvatarGroup(
  props: AvatarGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    className,
    component: RootComponent = 'div',
    size = 'md',
    variant = 'circular',
    ...other
  } = props;

  const rootClassName = classNames(classes.root, className);

  const contextValue = React.useMemo(
    () => ({
      component: RootComponent,
      size,
      variant,
    }),
    [RootComponent, size, variant],
  );

  return (
    <RootComponent className={rootClassName} ref={ref} {...other}>
      <AvatarGroupContext.Provider value={contextValue}>
        {children}
      </AvatarGroupContext.Provider>
    </RootComponent>
  );
});
