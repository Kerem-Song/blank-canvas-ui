export interface IFlexProps extends React.HTMLAttributes<HTMLElement> {
  vertical?: boolean;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  gap?: React.CSSProperties['gap'];
  children: React.ReactNode;
  reverse?: boolean;
  style?: React.CSSProperties;
}

export const Flex = ({
  vertical,
  wrap,
  justify,
  align,
  gap,
  children,
  reverse,
  style,
}: IFlexProps) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: vertical
          ? reverse
            ? 'column-reverse'
            : 'column'
          : reverse
            ? 'row-reverse'
            : 'row',
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        gap,
      }}
    >
      {children}
    </div>
  );
};
