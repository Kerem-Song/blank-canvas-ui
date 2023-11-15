import {
  OverrideProps,
  OverridableTypeMap,
  OverridableComponent,
} from '@models/OverridableComponent';

export interface ButtonBaseTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'button',
> {
  props: AdditionalProps & {
    /**
     * 구성품의 내용입니다.
     */
    children?: React.ReactNode;
    /**
     * `true`인 경우 구성 요소가 비활성화됩니다.
     * @default false
     */
    disabled?: boolean;
    /**
     * 버튼을 클릭하면 링크되는 URL입니다.
     * 정의된 경우 `a` 요소가 루트 노드로 사용됩니다.
     */
    href?: string;
    /**
     * `href` prop이 제공될 때 링크를 렌더링하는 데 사용되는 구성 요소입니다.
     * @default 'a'
     */
    LinkComponent?: React.ElementType;
    /**
     * @default 0
     */
    tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
    /**
     * 버튼의 원래 HTML 유형 설정
     * @default 'button'
     */
    type?:
      | React.ButtonHTMLAttributes<HTMLButtonElement>['type']
      | React.AnchorHTMLAttributes<HTMLAnchorElement>['type'];
    /**
     * 클래스 이름 접두사
     * @default 'luna'
     */
    prefixClasses?: string;
  };
  defaultComponent: DefaultComponent;
}

export interface ExtendButtonBaseTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & ButtonBaseTypeMap['props'];
  defaultComponent: TypeMap['defaultComponent'];
}

export type ButtonBaseProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonBaseTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export type ExtendButtonBase<TypeMap extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<TypeMap>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<TypeMap>>;
