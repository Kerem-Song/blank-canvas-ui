import classNames from "classnames";
import { ButtonHTMLAttributes, FC, createElement } from "react";

export type ButtonShape = "default" | "circle" | "round" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  types?:
    | "default"
    | "primary"
    | "secondary"
    | "lineBlue"
    | "error"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | "success";
  small?: boolean;
  large?: boolean;
  shape?: ButtonShape;
  block?: boolean;
  label?: string;
  disabled?: boolean;
  href?: string;
  htmlType?: string;
  icon?: string;
  draggable?: boolean;
  data?: string;
  form?: string;

  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDrag?: (e: React.DragEvent<HTMLButtonElement>) => void;
  onDragStart?: (e: React.DragEvent<HTMLButtonElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLButtonElement>) => void;
  onPointerDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FC<ButtonProps> = ({
  type = "default",
  small,
  large,
  block,
  children,
  label,
  disabled,
  href,
  htmlType = "button",
  shape = "default",
  icon,
  style,
  className,
  value,
  draggable,
  data,
  form,
  tabIndex,
  onClick,
  onDrag,
  onDragStart,
  onDrop,
  onDragEnd,
  onPointerDown,
  onMouseDown,
}) => {
  if (children && label) {
    throw new Error("children과 label은 동시에 설정할 수 없다.");
  }

  const labelNode = <span>{label || children}</span>;

  const controlCss = classNames(
    "btn",
    {
      "btn-small": small,
      "btn-large": large,
      "btn-disabled": disabled,
      "btn-block": block,
      "btn-circle": shape === "circle",
      "btn-primary": type === "primary",
      "btn-success": type === "success",
      "btn-error": type === "error",
      "btn-ghost": shape === "ghost",
    },
    className
  );

  const iconNode = icon ? (
    <span role="img" className="icon">
      <img src={icon} alt="icon" />
    </span>
  ) : undefined;

  const control = createElement(
    href ? "a" : "button",
    {
      className: controlCss,
      disabled: disabled && !href,
      href: href,
      type: htmlType,
      form,
      style: style,
      value,
      draggable,
      data,
      tabIndex,
      onClick,
      onDrag,
      onDragStart,
      onDrop,
      onDragEnd,
      onPointerDown,
      onMouseDown,
    },
    iconNode,
    labelNode
  );

  return control;
};
