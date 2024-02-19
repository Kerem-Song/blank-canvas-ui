import * as React from 'react';
import { OverrideProps } from '@models/types/OverridableComponent';

export interface AvatarTypeMap<DefaultComponent extends React.ElementType = 'div'> {
  props: {
    /**
     * `src` 또는 `srcSet`과 함께 사용됩니다.
     * 렌더링된 `img` 요소에 alt 속성을 적용하세요.
     */
    alt?: string;
    /**
     * `src`가 설정되지 않은 경우 아바타 내부의 아이콘이나 텍스트 요소를 렌더링하는 데 사용됩니다.
     * 요소일 수도 있고 문자열일 수도 있습니다.
     */
    children?: React.ReactNode;
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) 구성요소가 이미지를 표시하는 데 사용되는 경우 'img' 요소에 적용됩니다.
     * 로딩 오류 이벤트를 수신하는 데 사용할 수 있습니다.
     */
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    /**
     * 아바타 사이즈.
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg' | number;
    /**
     * `img` 요소의 `sizes` 속성.
     */
    sizes?: string;
    /**
     * `img` 요소의 `src` 속성.
     */
    src?: string;
    /**
     * `img` 요소의 `srcSet` 속성.
     * 반응형 이미지 표시를 위해 이 속성을 사용하세요.
     */
    srcSet?: string;
    /**
     * 구성 요소의 사용할 변형입니다.
     * @default 'circular'
     */
    variant?: 'circular' | 'rounded' | 'square';
  };
  defaultComponent: DefaultComponent;
}

export type AvatarProps<
  RootComponent extends React.ElementType = AvatarTypeMap['defaultComponent'],
> = OverrideProps<AvatarTypeMap<RootComponent>, RootComponent> & {
  component?: React.ElementType;
};
