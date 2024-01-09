import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

import { ITooltipProps } from './Tooltip.types';

export const Tooltip = ({
  defaultOpen = false,
  disable,
  offset = [0, 8],
  color,
  description,
  placement = 'right',
  arrow = true,
  strategy = 'fixed',
  mouseEnterDelay,
  mouseLeaveDelay,
  tooltipWidth,
  open,
  tooltipClassName,
  arrowClassName,
  children,
}: ITooltipProps) => {
  const width = tooltipWidth
    ? typeof tooltipWidth === 'string'
      ? `${tooltipWidth.replace(/[^0-9]/g, '')}px`
      : `${tooltipWidth}px`
    : '250px';
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const arrowElement = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [defaultShow, setDefaultShow] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setDefaultShow(defaultOpen);
  }, []);

  useEffect(() => {
    setInit(true);
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
    <div className="bc-container">
      <div
        aria-describedby="tooltip"
        className="bc-tooltip-data"
        ref={referenceElement}
        onMouseEnter={() => {
          setDefaultShow(false);
          open === undefined
            ? mouseEnterDelay
              ? setTimeout(() => {
                  setIsShow(true);
                }, mouseEnterDelay * 1)
              : setIsShow(true)
            : setIsShow(false);
        }}
        onMouseLeave={() => {
          setDefaultShow(false);
          open === undefined
            ? mouseLeaveDelay
              ? setTimeout(() => {
                  setIsShow(false);
                }, mouseLeaveDelay * 1)
              : setIsShow(false)
            : setIsShow(false);
        }}
      >
        {children}
      </div>

      {ReactDOM.createPortal(
        <div
          role="tooltip"
          {...attributes.popper}
          className={classNames('bc-tooltip', 'bc-tooltip-base', tooltipClassName)}
          style={{
            ...styles.popper,
            maxWidth: width,
            visibility:
              open === undefined
                ? defaultShow || isShow
                  ? 'visible'
                  : 'hidden'
                : open && init
                  ? 'visible'
                  : 'hidden',
            background: color,
          }}
          ref={popperElement}
          data-arrow-visible={
            open === undefined ? defaultShow || isShow : open ? true : false
          }
        >
          <div>{description}</div>
          {arrow && (
            <div
              ref={arrowElement}
              className={classNames(arrowClassName, 'bc-arrow')}
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
