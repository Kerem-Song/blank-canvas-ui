export interface ICardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 카드의 타이틀 영역
   * @type React.ReactNode
   */
  title?: React.ReactNode;
  /**
   * 카드 타이틀 영역 오른쪽 영역
   * @type React.ReactNode
   */
  extra?: React.ReactNode;
  /**
   * 카드에 라운드를 줄지 선택
   * @default false
   * @type boolean
   */
  rounded?: boolean;
  /**
   * 카드 크기
   * @type 'small' | 'default'
   */
  size?: 'small' | 'default';
  /**
   * 타이틀 영역 색상
   * @type string
   */
  titleBgColor?: string;
  /**
   * 타이틀 색상
   * @type string
   */
  titleColor?: string;
  /**
   * 카드 테두리선 선택 여부
   * @default true
   * @type boolean
   */
  bordered?: boolean;
  /**
   * component를 전달
   * @type React.ReactNode | React.ReactNode[]
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * 카드에 로딩(skeleton) 표시할지 선택
   * @default
   * @type boolean
   */
  loading?: boolean;
}
