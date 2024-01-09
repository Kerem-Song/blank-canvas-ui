export interface IFlexProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 아이템들이 배치되는 축의 방향을 결정
   * @default false
   * @type boolean
   */
  vertical?: boolean;
  /**
   * 메인축 방향으로 아이템을 정렬하는 속성
   * `flex-start` `space-between` `center` `space-between` `space-around` `space-evenly`
   * @default normal
   * @type string
   */
  justify?: React.CSSProperties['justifyContent'];
  /**
   * 수직축 방향
   * `flex-start` `flex-end` `center`
   * @default normal
   * @type string
   */
  align?: React.CSSProperties['alignItems'];
  /**
   * 컨테이너가 더 이상 아이템들을 한 줄에 담을 여유 공간이 없을 때 아이템 줄바꿈을 어떻게 할지 결정하는 속성
   * `nowrap` `wrap` `wrap-reverse` `initial`
   * @default nowrap
   *
   */
  wrap?: React.CSSProperties['flexWrap'];
  /**
   * 행과 열 사이의 간격 (gutters)을 설정
   * @default 0
   * @type number
   */
  gap?: React.CSSProperties['gap'];
  /**
   * 아이템 역순 배치할지 결정
   * @default false
   * @type boolean
   */
  reverse?: boolean;
  /**
   * component를 전달
   */
  children: React.ReactNode | React.ReactNode[];
}
