import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface IRowProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 수직축 방향
   * `flex-start` `flex-end` `center`
   * @default flex-start
   * @type string
   */
  align?: React.CSSProperties['alignItems'];
  /**
   * 컨테이너가 더 이상 아이템들을 한 줄에 담을 여유 공간이 없을 때 아이템 줄바꿈을 어떻게 할지 결정하는 속성
   * `nowrap` `wrap` `wrap-reverse` `initial`
   * @default wrap
   *
   */
  wrap?: React.CSSProperties['flexWrap'];
  /**
   * 그리드 사이의 간격을 줄 수 있음
   * @type number | [number, number]
   * @default
   *
   */
  gutter?: number | [number, number];
  /**
   * 메인축 방향으로 아이템을 정렬하는 속성
   * `flex-start` `space-between` `center` `space-between` `space-around` `space-evenly`
   * @default flex-start
   *
   */
  justify?: React.CSSProperties['justifyContent'];
  /**
   * component를 전달
   */
  children: React.ReactNode | React.ReactNode[];
}

export const Row = ({
  wrap = 'wrap',
  justify,
  gutter,
  align,
  children,
  style,
  className,
  ...props
}: IRowProps) => {
  const rowValue = Array.isArray(gutter) ? gutter[1] : gutter ? gutter : 0;
  const colValue = Array.isArray(gutter) ? gutter[0] / 2 : gutter ? gutter / 2 : 0;

  const addStyleChildren = React.Children.map<ReactNode, ReactNode>(children, (child) => {
    const element = child as React.ReactElement<any>;
    return React.cloneElement(element, {
      padding: colValue,
      className: classNames('box-border'),
    });
  });

  return (
    <div
      {...props}
      className={classNames('box-border', 'flex', className)}
      style={{
        ...style,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        rowGap: `${rowValue}px`,
        marginLeft: `-${colValue}px`,
        marginRight: `-${colValue}px`,
      }}
    >
      {addStyleChildren}
    </div>
  );
};
