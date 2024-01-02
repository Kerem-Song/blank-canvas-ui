import { Flex } from '@components';
import { forwardRef, ReactNode } from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

export interface ISpinProps extends React.HTMLAttributes<HTMLElement> {
  delay?: number;
  indicator?: ReactNode;
  type?: LoadingType;
  color?: string;
  tip?: ReactNode;
  size?: number | string;
  fullscreen?: boolean;
}

export const Spin = forwardRef<HTMLElement, ISpinProps>((props, ref) => {
  const {
    delay,
    indicator,
    type = 'spinningBubbles',
    tip,
    color,
    fullscreen,
    className,
    style,
    size,
    ...inputProps
  } = props;
  return (
    <div className="">
      <div className="spin inline-block">
        {indicator ? (
          <span>{indicator}</span>
        ) : (
          <span>
            <ReactLoading type={type} color={'red'} height={'60px'} width={'60px'} />
          </span>
        )}
        {tip !== undefined && <div>{tip}</div>}
      </div>
    </div>
  );
});
