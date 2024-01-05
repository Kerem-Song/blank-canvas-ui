import { IBadgeProps } from '@components/data-display/Badge/Badge';
import { HTMLAttributes } from 'react';

export type RenderFunction = () => React.ReactNode;

export interface BadgeProps {
  /** Number to show in badge */
  count?: React.ReactNode;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** Whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  text?: React.ReactNode;
  size?: 'default' | 'small';
  offset?: [number | string, number | string];
  title?: string;
  children?: React.ReactNode;
  classNames?: {
    root?: string;
    indicator?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    indicator?: React.CSSProperties;
  };
}

export type FloatButtonBadgeProps = {
  text?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
};

export type IFloatingActionMenuProps = Omit<
  IFloatingActionButtonProps,
  'menu' | 'trigger' | 'closeIcon' | 'right' | 'bottom' | 'shape'
>;

export interface IFloatingActionButtonProps extends HTMLAttributes<HTMLElement> {
  /**
   * 플로팅 버튼의 모양
   * @default 'circle'
   */
  shape: 'circle' | 'square';

  /**
   * 플로팅 버튼에 들어가는 아이콘 경로
   * (ex: import icEx from * 'src/assets/icons/ic_ex.svg'로 import 후 icEx를 입력)
   */
  icon: string;

  /**
   * 플로팅버튼 아이콘 밑에 들어가는 텍스트
   */
  description?: React.ReactNode;

  /**
   * 플로팅 버튼의 right위치 조정(px)
   * @default 30
   */
  right?: number;

  /**
   * 플로팅 버튼의 bottom위치 조정(px)
   * @default 50
   */
  bottom?: number;

  /**
   * 플로팅버튼에 호버시 노출되는 툴팁
   */
  tooltip?: string;

  /**
   * 뱃지 사용 여부
   * @default false
   */
  useBadge?: boolean;

  /**
   * 뱃지의 타입(text, title, children)
   */
  badge?: IBadgeProps;

  /**
   * aria-label
   */
  ['aria-label']?: React.HtmlHTMLAttributes<HTMLElement>['aria-label'];

  /**
   * 플로팅 버튼이 그룹 메뉴 형태일 때 사용되는 메뉴들
   */
  menu?: IFloatingActionMenuProps[];

  /**
   * 플로팅 버튼이 그룹 메뉴 형태일 때 메뉴들을 보여주기 위한 방식
   * @default 'click'
   */
  trigger?: 'click' | 'hover';

  /**
   * 플로팅 버튼이 그룹 메뉴 형태일 때 메뉴를 닫고 버튼 하나로 변경하기 위한 아이콘
   * (ex: import icEx from * 'src/assets/icons/ic_ex.svg'로 import 후 icEx를 입력)
   */
  closeIcon?: string;

  /**
   * 플로팅 버튼 클릭 시 실행되는 함수
   */
  callback: () => void;

  /**
   * 플로팅 버튼이 그룹 메뉴 형태이고 열린 상태일 때 실행되는 함수
   * @param isOpen
   */
  onOpenChange?: (isOpen: boolean) => void;
}
