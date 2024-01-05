export interface IRowProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 수직축 방향
   * `flex-start` `flex-end` `center`
   * @default flex-start
   * @type string
   */
  align?: React.CSSProperties['alignItems'];
  /**
   * 컨테이너가 더 이상 아이템들을 한 줄에 담을 여유 공간이 없을 때 아이템 줄바꿈을 어떻게 할지 결정하는 속성
   * `nowrap` `wrap` `wrap-reverse` `initial`
   * @default wrap
   *
   */
  wrap?: React.CSSProperties['flexWrap'];
  /**
   * 그리드 사이의 간격을 줄 수 있음
   * @type number | [number, number]
   * @default
   *
   */
  gutter?: number | [number, number];
  /**
   * 메인축 방향으로 아이템을 정렬하는 속성
   * `flex-start` `space-between` `center` `space-between` `space-around` `space-evenly`
   * @default flex-start
   *
   */
  justify?: React.CSSProperties['justifyContent'];
  /**
   * component를 전달
   */
  children: React.ReactNode | React.ReactNode[];
}
