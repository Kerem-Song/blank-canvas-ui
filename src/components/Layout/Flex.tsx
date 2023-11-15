export interface IFlexProps extends React.HTMLAttributes<HTMLElement> {
  vertical?: boolean;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'];
  children: React.ReactNode;
  reverse?: boolean;
}

export const Flex = ({
  vertical,
  wrap,
  justify,
  align,
  flex,
  gap,
  children,
  reverse,
}: IFlexProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flex,
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
