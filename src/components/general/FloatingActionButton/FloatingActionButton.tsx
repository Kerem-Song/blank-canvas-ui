import { Badge, IBadgeProps, Tooltip } from '@components';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import { AnchorHTMLAttributes, forwardRef, useRef, useState } from 'react';

import { floatingActionButtonClasses } from './FloatingActionButtonClasses';
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

export interface IFloatingActionButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * 플로팅 버튼의 모양
   */
  shape: 'circle' | 'square';

  /**
   * 플로팅 버튼에 들어가는 아이콘
   */
  icon: React.ReactNode;

  /**
   * 플로팅버튼 아이콘 밑에 들어가는 텍스트
   */
  description?: React.ReactNode;

  /**
   * 플로팅 버튼의 right위치 조정(px)
   */
  right: number;

  /**
   * 플로팅 버튼의 bottom위치 조정(px)
   */
  bottom: number;

  /**
   * 플로팅버튼에 호버시 노출되는 툴팁
   */
  tooltip?: string;

  /**
   * 뱃지 사용 여부
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
   */
  trigger?: 'click' | 'hover';

  /**
   * 플로팅 버튼이 그룹 메뉴 형태일 때 메뉴를 닫고 버튼 하나로 변경하기 위한 아이콘
   */
  closeIcon?: React.ReactNode;

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

export const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  IFloatingActionButtonProps
>((args, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const floatingAtionButtonRef = useRef<HTMLDivElement>(null);
  const {
    className,
    prefix,
    trigger,
    style,
    icon,
    description,
    right,
    bottom,
    closeIcon,
    menu,
    children,
    badge,
    useBadge,
    tooltip,
    callback,
    onOpenChange,
    ...buttonProps
  } = args;

  const classes = generatePrefixClasses(
    floatingActionButtonClasses,
    `${prefix ? `${prefix}-` : ''}floating-action-button`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // disabled
      [classes.disabled]: args['aria-disabled'],

      // shape
      [classes.circle]: args.shape === 'circle',
      [classes.square]: args.shape === 'square',

      // group menu trigger(hover or click)
      [classes.triggerClick]: args.trigger === 'click',
      [classes.triggerHover]: args.trigger === 'hover',
      [classes.badgeCounter]: args.useBadge === true,
    },
    className,
  );

  const handleClick = () => {
    console.log('@handle click');
    if (trigger === 'click') {
      menu && setIsOpen(!isOpen);
      callback();
    }
  };

  return (
    <div
      className={classNames('floating-action-button-wrapper', {
        open: isOpen,
        'badge-counter': useBadge,
      })}
      style={{ right: `${right}px`, bottom: `${bottom}px` }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        trigger === 'hover' && menu && setIsOpen(false);
      }}
    >
      {menu?.map((item, i) => (
        <Badge
          key={i}
          count={item.badge?.count}
          overflowCount={item.badge?.overflowCount}
          color={item.badge?.color}
          dot={item.badge?.dot}
          showZero={item.badge?.showZero}
          offset={[5, 10]}
        >
          <Tooltip text={item.tooltip ?? ''} disable={!item.tooltip} placement="left">
            <div
              className={classNames(rootClassName, { 'hidden-menu': menu, open: isOpen })}
            >
              <button
                className={classNames('hidden-button')}
                onClick={item.callback}
                key={i}
              >
                <div className="icon">{item.icon}</div>
                <div className="description">{item.description}</div>
              </button>
            </div>
          </Tooltip>
        </Badge>
      ))}
      <Badge
        count={badge?.count}
        overflowCount={badge?.overflowCount}
        color={badge?.color}
        dot={badge?.dot}
        showZero={badge?.showZero}
        offset={[5, 10]}
      >
        <Tooltip text={tooltip ?? ''} disable={!tooltip} placement="left">
          <div
            className={rootClassName}
            onMouseEnter={(e) => {
              e.stopPropagation();
              trigger === 'hover' && menu && setIsOpen(true);
            }}
          >
            <button onClick={handleClick}>
              <div className="icon">{isOpen ? closeIcon : icon}</div>
              <div className="description">{description}</div>
            </button>
          </div>
        </Tooltip>
      </Badge>
    </div>
  );
});
