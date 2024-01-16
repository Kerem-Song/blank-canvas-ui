import { OverrideProps } from '@models/types';
import React from 'react';

import { AvatarTypeMap } from './Avatar.types';

export interface AvatarGroupTypeMap<DefaultComponent extends React.ElementType = 'div'> {
  props: Pick<AvatarTypeMap['props'], 'size' | 'variant'> & {
    /**
     * 쌓을 아바타 컴포넌트.
     */
    children?: React.ReactNode;
    /**
     * 클래스 이름 접두사
     * @default 'bc'
     */
    prefix?: string;
  };
  defaultComponent: DefaultComponent;
}

export type AvatarGroupProps<
  RootComponentType extends React.ElementType = AvatarGroupTypeMap['defaultComponent'],
> = OverrideProps<AvatarGroupTypeMap<RootComponentType>, RootComponentType> & {
  component?: React.ElementType;
};
