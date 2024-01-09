type Placement = 'top' | 'bottom' | 'right' | 'left';
type Strategy = 'absolute' | 'fixed';

export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * tooltip에 표시할 내용
   * @default
   * @type React.ReactNode
   */
  description: React.ReactNode;
  /**
   * tooltip 표시 위치 지정
   * @default 'right'
   * @type 'top' | 'bottom' | 'right' | 'left'
   */
  placement?: Placement;
  /**
   * tooltip을 처음에 표시할지 선택
   * @default false
   * @type boolean
   */
  defaultOpen?: boolean;
  /**
   * tooltip에 화살표 표시 할지 여부 선택
   * @default false
   * @type boolean
   */
  arrow?: boolean;
  /**
   * 기준이 되는 데이터에서 tooltip 위치 변경(위/아래, 왼/오)
   * @default [0, 8]
   * @type [number, number]
   */
  offset?: [number, number];
  /**
   * tooltip 색상 적용
   * @default white
   * @type string
   */
  color?: string;
  /**
   * tooltip 보여줄지 선택
   * @default false
   * @type boolean
   */
  disable?: boolean;
  /**
   * 기준이 되는 데이터에 tooltip 표시할 방법 선택
   * @default fixed
   * @type 'absolute' | 'fixed'
   */
  strategy?: Strategy;
  /**
   * 기준이 되는 데이터에 마우스를 올렸을 때 툴팁이 나타나는 시간
   * @default
   * @type number
   */
  mouseEnterDelay?: number;
  /**
   * 기준이 되는 데이터에 마우스가 벗어났을 때 툴팁을 유지하는 시간
   * @default
   * @type number
   */
  mouseLeaveDelay?: number;
  /**
   * 툴팁을 보여줄지 여부 선택
   * @default
   * @type boolean
   */
  open?: boolean;
  /**
   * 툴팁의 크기 지정 px 기준
   * @default 250px
   * @type number | string;
   */
  tooltipWidth?: number | string;
  /**
   * 툴팁 className 지정
   * @default
   * @type string;
   */
  tooltipClassName?: string;
  /**
   * 화살표 className 지정
   * @default
   * @type string;
   */
  arrowClassName?: string;
  /**
   * component를 전달
   */
  children?: React.ReactNode | React.ReactNode[];
}
