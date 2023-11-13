import { IHasClassNameNStyle, ShowCountFormatter } from "@models";
import classNames from "classnames";
import React, { ChangeEvent, FocusEvent, forwardRef, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";

export interface TextareaProps extends IHasClassNameNStyle {
  maxLength?: number;
  placeholder?: string;
  showCount?: boolean;
  maxRows?: number;
  minRows?: number;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  isError?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoComplete?: boolean;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (args, ref) => {
    const { style, readOnly, ...inputProps } = args;

    const handleTextArea = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        return args.onChange?.(e);
      },
      [args]
    );

    const resultClassName = classNames("textarea-border", args.className);

    return (
      <TextareaAutosize
        {...inputProps}
        className={resultClassName}
        onChange={handleTextArea}
        placeholder={args.placeholder}
        maxLength={args.maxLength}
        ref={ref}
        readOnly={readOnly}
        autoComplete={args.autoComplete ? "true" : "false"}
      />
    );
  }
);

Textarea.displayName = "textarea";
