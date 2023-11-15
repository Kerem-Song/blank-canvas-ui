/**
 * 구성요소에 정의된 속성
 */
export type BaseProps<M extends OverridableTypeMap> = M['props'];

/**
 * `component={Component}`가 사용된 경우의 구성요소 속성
 */
// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<C>, keyof BaseProps<M>>
);

/**
 *  `component={Component}`가 사용되지 않는 경우의 구성요소 속성
 */
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}

/**
 * 루트 구성요소가 `component` 속성을 통해 제어될 수 있는 구성요소입니다.
 *
 * `component`의 종류에 따라 유효한 속성을 조정합니다.
 */
// prettier-ignore
export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ElementType>(
    props: {
      /**
       * 루트 노드에 사용되는 구성 요소입니다.
       * HTML 요소 또는 구성 요소를 사용하는 문자열입니다.
       */
      component: C;
    } & OverrideProps<M, C>,
  ): JSX.Element | null;
  (props: DefaultComponentProps<M>): JSX.Element | null;
}
