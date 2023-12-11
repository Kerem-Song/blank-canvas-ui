import classNames from 'classnames';

export interface IColProps extends React.HTMLAttributes<HTMLElement> {
  gutter?: number;
  /**
   * flex-grow, flex-shrink, flex-basis를 한 번에 쓸 수 있는 축약형 속성
   * @default
   * @type number | string;
   */
  flex?: number | string;
  /**
   * 전체 너비 24가 하나의 컬럼. span속성의 값 만큼 나눠 갖음
   * @default
   * @type number
   */
  span?: number;
  /**
   * 각 아이템들의 시각적 나열 순서를 결정하는 속성
   * @type number
   */
  order?: number;
  /**
   * component를 전달
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * padding 계산 값
   */
  paddingValue?: number;
}

export const Col = ({
  flex,
  span,
  order,
  children,
  style,
  paddingValue,
  ...props
}: IColProps) => {
  const basis = span && span > 0 ? (span * 100) / 24 : 0;
  const basisValue = basis > 0 ? `0 0 ${basis}%` : 'none';
  const flexValue = flex
    ? flex === 'auto'
      ? `1 1 ${flex}`
      : typeof flex === 'string' && flex.search(/\s/) !== -1
        ? flex
        : typeof flex === 'number' || (typeof flex === 'string' && Number(flex))
          ? `${flex} ${flex} auto`
          : `0 0 ${flex}`
    : basisValue;
  const maxWidth = basis > 0 ? `${basis}%` : 'auto';
  return (
    <div
      {...props}
      className={classNames(props.className)}
      style={{
        display: span === 0 ? 'none' : 'block',
        maxWidth: maxWidth,
        flex: flexValue,
        padding: paddingValue ? `0 ${paddingValue}px` : '0',
        order,
      }}
    >
      <div style={{ ...style }}>{children}</div>
    </div>
  );
};
