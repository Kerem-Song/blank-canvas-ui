import { Flex } from '@components';
import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';
import ReactLoading, { LoadingType } from 'react-loading';
import { util } from 'src/utils/utils';

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
}

export const Spin = forwardRef<HTMLElement, ISpinProps>((props, ref) => {
  const {
    delay,
    indicator,
    type = 'spinningBubbles',
    tip,
    color = 'gray',
    fullscreen,
    className,
    style,
    size = 35,
    children,
    ...spinProps
  } = props;
  const tempWidth = typeof size !== 'number' ? util.findNumber(size) : size;
  const width = tempWidth > 34 ? tempWidth : 35;

  return (
    <div
      className={classNames(
        'spin-area',
        { 'spin-fullscreen': fullscreen },
        { 'spin-bgColor': children },
      )}
    >
      <div
        {...spinProps}
        className={classNames({ 'spin-children': fullscreen || children }, 'spin')}
      >
        {indicator ? (
          <span className={classNames('spin-indicator')} style={{ ...style }}>
            {indicator}
          </span>
        ) : (
          <span
            style={{ ...style }}
            className={classNames({
              'inline-block': tip,
            })}
          >
            <ReactLoading
              type={type}
              color={color}
              height={width}
              width={width}
              delay={delay}
            />
          </span>
        )}
        {tip !== undefined && <div>{tip}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
});
