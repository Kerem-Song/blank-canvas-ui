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
  href?: string;
  htmlType?: string;
  icon?: string;
  draggable?: boolean;
  data?: string;
  form?: string;
}

export const Button = ({
  types = "default",
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
}:ButtonProps) => {
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
      "btn-primary": types === "primary",
      "btn-success": types === "success",
      "btn-error": types === "error",
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
