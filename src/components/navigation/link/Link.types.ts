import * as React from 'react';
import { OverrideProps } from '@models/types/OverridableComponent';

export interface LinkTypeMap<DefaultComponent extends React.ElementType = 'a'> {
  props: {
    /**
     * 구성품의 내용입니다.
     */
    children?: React.ReactNode;
    /**
     * 구성 요소의 색상입니다.
     * @default 'primary'
     */
    color?:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'error'
      | 'info'
      | 'warning'
      | 'dark';
    /**
     * `true`인 경우 구성요소가 비활성화됩니다.
     * @default false
     */
    disabled?: boolean;
    /**
     * 클릭하면 링크되는 URL입니다.
     */
    href?: string;
    /**
     * `true`인 경우 상호작용 영역을 포함하기 위해 ::after 의사 요소가 추가됩니다.
     * 오버레이 링크의 상위에는 `relative` CSS position이 있어야 합니다.
     * @default false
     */
    overlay?: boolean;
    /**
     * 링크에 밑줄을 표시해야 하는 경우를 제어합니다.
     * @default 'always'
     */
    underline?: 'none' | 'hover' | 'always';
    /**
     * 구성 요소의 크기입니다.
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';
  };
  defaultComponent: DefaultComponent;
}

export type LinkProps<
  RootComponentType extends React.ElementType = LinkTypeMap['defaultComponent'],
> = OverrideProps<LinkTypeMap<RootComponentType>, RootComponentType> & {
  component?: React.ElementType;
};
