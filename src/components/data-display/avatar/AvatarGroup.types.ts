import * as React from 'react';
import { OverrideProps } from '@models/types/OverridableComponent';

import { AvatarTypeMap } from './Avatar.types';

export interface AvatarGroupTypeMap<DefaultComponent extends React.ElementType = 'div'> {
  props: Pick<AvatarTypeMap['props'], 'size' | 'variant'> & {
    /**
     * 쌓을 아바타 컴포넌트.
     */
    children?: React.ReactNode;
  };
  defaultComponent: DefaultComponent;
}

export type AvatarGroupProps<
  RootComponentType extends React.ElementType = AvatarGroupTypeMap['defaultComponent'],
> = OverrideProps<AvatarGroupTypeMap<RootComponentType>, RootComponentType> & {
  component?: React.ElementType;
};
