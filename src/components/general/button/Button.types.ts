import { OverridableComponent, OverrideProps, OverridableTypeMap } from '@models/types';
import React from 'react';

export interface ButtonTypeMap<DefaultComponent extends React.ElementType = 'button'> {
  props: {
    /**
     * 구성품의 내용입니다.
     */
    children?: React.ReactNode;
    /**
     * 구성 요소의 색상입니다.
     * @default 'default'
     */
    color?:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'error'
      | 'info'
      | 'warning'
      | 'dark'
      | 'light';
    /**
     * `true`인 경우 구성 요소가 비활성화됩니다.
     * @default false
     */
    disabled?: boolean;
    /**
     * 자식 뒤에 배치되는 icon 요소입니다.
     */
    endIcon?: React.ReactNode;
    /**
     * 버튼을 클릭하면 링크되는 URL입니다.
     * 정의된 경우 `a` 요소가 루트 노드로 사용됩니다.
     */
    href?: string;
    /**
     * 구성 요소의 모양입니다.
     * @default 'default'
     */
    shape?: 'default' | 'circle' | 'round';
    /**
     * 구성 요소의 크기입니다.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * 자식 앞에 배치되는 icon 요소입니다.
     */
    startIcon?: React.ReactNode;
    /**
     * 슬롯 커스텀 속성
     */
    slotProps?: {
      iconWrapper?: React.HTMLAttributes<HTMLSpanElement>;
    };
    /**
     * @default 0
     */
    tabIndex?: number;
    /**
     * 클래스 이름 접두사
     * @default 'luna-btn'
     */
    prefix?: string;
    /**
     * 구성 요소의 사용할 변형입니다.
     * @default 'outlined'
     */
    variant?: 'contained' | 'outlined' | 'text';
  };
  defaultComponent: DefaultComponent;
}

export interface ExtendButtonTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & ButtonTypeMap['props'];
  defaultComponent: TypeMap['defaultComponent'];
}

export type ButtonProps<
  RootComponentType extends React.ElementType = ButtonTypeMap['defaultComponent'],
> = OverrideProps<ButtonTypeMap<RootComponentType>, RootComponentType> & {
  component?: React.ElementType;
};

export type ExtendButton<TypeMap extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonTypeMap<TypeMap>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendButtonTypeMap<TypeMap>>;
