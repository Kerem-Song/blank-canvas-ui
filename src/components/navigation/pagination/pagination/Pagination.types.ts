import * as React from 'react';

import {
  UsePaginationItem,
  UsePaginationProps,
} from '../usePagination/usePagination.types';

export interface PaginationRenderItemParams extends UsePaginationItem {
  color: PaginationProps['color'];
  shape: PaginationProps['shape'];
  size: PaginationProps['size'];
  variant: PaginationProps['variant'];
  'aria-label': string;
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'onChange'>,
    UsePaginationProps {
  /**
   * 구성요소의 활성 색상입니다.
   * @default 'primary'
   */
  color?: 'default' | 'primary' | 'secondary';
  /**
   * 구성요소의 모양입니다.
   * @default 'round'
   */
  shape?: 'default' | 'circle' | 'round';
  /**
   * 구성요소의 크기입니다.
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 클래스 이름 접두사
   */
  prefix?: string;
  /**
   * 구성요소의 사용할 변형입니다.
   * @default 'outlined'
   */
  variant?: 'contained' | 'outlined' | 'text';
  /**
   * 항목을 렌더링합니다.
   * @param {PaginationRenderItemParams} params PaginationRenderItem 의 속성 일부입니다.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem?: (params: PaginationRenderItemParams) => React.ReactNode;
}