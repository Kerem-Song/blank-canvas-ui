import * as React from 'react';
import { OverrideProps } from '@models/types/OverridableComponent';

import { PaginationItemType } from '../usePagination/usePagination.types';

export interface PaginationItemTypeMap<
  DefaultComponent extends React.ElementType = 'div',
> {
  props: {
    /**
     * 구성요소의 활성 색상입니다.
     * @default 'primary'
     */
    color?: 'default' | 'primary' | 'secondary';
    /**
     * `true`인 경우 구성요소가 비활성화됩니다.
     * @default false
     */
    disabled?: boolean;
    /**
     * 현재 페이지 번호입니다.
     */
    page?: React.ReactNode;
    /**
     * 구성요소의 모양입니다.
     * @default 'round'
     */
    shape?: 'default' | 'circle' | 'round';
    /**
     * 구성요소의 크기입니다.
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * `true`이면 구성요소가 선택됩니다.
     * @default false
     */
    selected?: boolean;
    /**
     * 내부의 각 슬롯에 사용되는 구성요소입니다.
     * @default {}
     */
    slots?: {
      first?: React.ElementType;
      last?: React.ElementType;
      next?: React.ElementType;
      previous?: React.ElementType;
      'start-ellipsis'?: React.ElementType;
      'end-ellipsis'?: React.ElementType;
    };
    /**
     * 슬롯 커스텀 속성
     * @default {}
     */
    slotProps?: {
      first?: Partial<React.ComponentPropsWithRef<React.ElementType>>;
      last?: Partial<React.ComponentPropsWithRef<React.ElementType>>;
      next?: Partial<React.ComponentPropsWithRef<React.ElementType>>;
      previous?: Partial<React.ComponentPropsWithRef<React.ElementType>>;
      'start-ellipsis'?: Partial<React.ComponentPropsWithRef<React.ElementType>>;
      'end-ellipsis'?: Partial<React.ComponentPropsWithRef<React.ElementType>>;
    };
    /**
     * 구성요소의 유형입니다.
     * @default 'page'
     */
    type?: PaginationItemType;
    /**
     * 구성요소의 사용할 변형입니다.
     * @default 'contained'
     */
    variant?: 'contained' | 'outlined' | 'text';
  };
  defaultComponent: DefaultComponent;
}

export type PaginationItemProps<
  RootComponent extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
> = OverrideProps<PaginationItemTypeMap<RootComponent>, RootComponent> & {
  component?: React.ElementType;
};
