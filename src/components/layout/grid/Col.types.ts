export interface IColProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number;
  /**
   * flex-grow, flex-shrink, flex-basis를 한 번에 쓸 수 있는 축약형 속성
   * @default
   * @type number | string;
   */
  flex?: number | string;
  /**
   * 전체 너비 24가 하나의 컬럼. span속성의 값 만큼 나눠 갖음
   * @default
   * @type number
   */
  span?: number;
  /**
   * 각 아이템들의 시각적 나열 순서를 결정하는 속성
   * @type number
   */
  order?: number;
  /**
   * component를 전달
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * padding 계산 값
   */
  paddingvalue?: number;
}
