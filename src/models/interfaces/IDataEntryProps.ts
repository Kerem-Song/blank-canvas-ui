import { LiteralUnion } from "@models";
import {
  CSSProperties,
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
} from "react";
export interface IDataEntryProps {
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string | number;
  isError?: boolean;
  required?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CommonInputProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  /** @deprecated Use `classNames` instead */
  classes?: {
    affixWrapper?: string;
    group?: string;
    wrapper?: string;
  };
  classNames?: {
    affixWrapper?: string;
    prefix?: string;
    suffix?: string;
  };
  styles?: {
    affixWrapper?: CSSProperties;
    prefix?: CSSProperties;
    suffix?: CSSProperties;
  };
  allowClear?: boolean | { clearIcon?: ReactNode };
}

export type ValueType = InputHTMLAttributes<HTMLInputElement>["value"] | bigint;
export interface InputProps
  extends CommonInputProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "size" | "prefix" | "type" | "value"
    > {
  value?: ValueType;
  prefixCls?: string;
  // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types
  type?: LiteralUnion<
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week",
    string
  >;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  /** It's better to use `count.show` instead */
  showCount?:
    | boolean
    | {
        formatter: ShowCountFormatter;
      };
  autoComplete?: string;
  htmlSize?: number;
  classNames?: CommonInputProps["classNames"] & {
    input?: string;
    count?: string;
  };
  styles?: CommonInputProps["styles"] & {
    input?: CSSProperties;
    count?: CSSProperties;
  };
  count?: CountConfig;
}

export type ShowCountFormatter = (args: {
  value: string;
  count: number;
  maxLength?: number;
}) => ReactNode;

export type ExceedFormatter = (
  value: string,
  config: { max: number }
) => string;

export interface CountConfig {
  max?: number;
  strategy?: (value: string) => number;
  show?: boolean | ShowCountFormatter;
  /** Trigger when content larger than the `max` limitation */
  exceedFormatter?: ExceedFormatter;
}
