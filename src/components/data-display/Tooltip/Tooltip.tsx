import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

type Placement = 'top' | 'bottom' | 'right' | 'left';
type Strategy = 'absolute' | 'fixed';

export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * tooltip에 표시할 내용
   * @default
   * @type string
   */
  text: string;
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
   * component를 전달
   */
  children?: React.ReactNode | React.ReactNode[];
}

export const Tooltip = ({
  defaultOpen = false,
  disable,
  offset = [0, 8],
  color,
  text,
  placement = 'right',
  arrow = true,
  strategy = 'fixed',
  mouseEnterDelay,
  mouseLeaveDelay,
  open,
  children,
}: ITooltipProps) => {
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const arrowElement = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [defaultShow, setDefaultShow] = useState(false);

  useEffect(() => {
    setDefaultShow(defaultOpen);
  }, []);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: placement,
      modifiers: [
        { name: 'arrow', options: { element: arrowElement.current } },
        {
          name: 'offset',
          options: {
            offset: offset,
          },
        },
      ],
      strategy: strategy,
    },
  );

  if (disable) {
    return <>{children}</>;
  }

  return (
    <div id="container">
      <div
        aria-describedby="tooltip"
        id="tooltip-data"
        ref={referenceElement}
        onMouseEnter={() => {
          setDefaultShow(false);
          open === undefined
            ? mouseEnterDelay
              ? setTimeout(() => {
                  setIsShow(true);
                }, mouseEnterDelay * 1000)
              : setIsShow(true)
            : setIsShow(false);
        }}
        onMouseLeave={() => {
          setDefaultShow(false);
          open === undefined
            ? mouseLeaveDelay
              ? setTimeout(() => {
                  setIsShow(false);
                }, mouseLeaveDelay * 1000)
              : setIsShow(false)
            : setIsShow(false);
        }}
      >
        {children}
      </div>
      {ReactDOM.createPortal(
        <div
          id="tooltip"
          role="tooltip"
          {...attributes.popper}
          className={classNames('tooltip-base')}
          style={{
            ...styles.popper,
            visibility:
              open === undefined
                ? defaultShow || isShow
                  ? 'visible'
                  : 'hidden'
                : open
                  ? 'visible'
                  : 'hidden',
            background: color,
          }}
          ref={popperElement}
          data-arrow-visible={
            open === undefined ? defaultShow || isShow : open ? true : false
          }
        >
          <div>{text}</div>
          {arrow && (
            <div
              id="arrow"
              ref={arrowElement}
              data-popper-arrow
              style={{
                ...styles.arrow,
                background: color,
              }}
            ></div>
          )}
        </div>,
        document.querySelector('body')!,
      )}
    </div>
  );
};
