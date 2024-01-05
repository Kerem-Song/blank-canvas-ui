import { ReactNode } from 'react';
import { LoadingType } from 'react-loading';

export interface ISpinProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * spin 시작 시간 조절
   * @default
   * @type number
   */
  delay?: number;
  /**
   * spin 모양 변경
   * @default
   * @type ReactNode
   */
  indicator?: ReactNode;
  /**
   * spin 모양 변경
   * @default spinningBubbles
   * @type "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes"
   */
  type?: LoadingType;
  /**
   * spin 색상 변경
   * @default gray
   * @type string
   */
  color?: string;
  /**
   * spin 아래 추가로 넣을 필요가 있을 때 사용
   * @default
   * @type ReactNode
   */
  tip?: ReactNode;
  /**
   * spin 크기 조절 (최소값 35)
   * @default 35
   * @type number | string
   */
  size?: number | string;
  /**
   * 전체화면으로 spin을 적용할지 적용
   * @default
   * @type boolean
   */
  fullscreen?: boolean;
  spinning?: boolean;
}
