import classNames from "classnames";
import React, { InputHTMLAttributes, forwardRef, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";

export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  showCount?: boolean;
  maxRows?: number;
  minRows?: number;
}
export interface ITestInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (args, ref) => {
    const { style, readOnly, ...inputProps } = args;

    const handleTextArea = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        return args.onChange?.(e);
      },
      [args]
    );

    const resultClassName = classNames(
      "textarea textarea-border",
      args.className
    );

    return (
      <TextareaAutosize
        {...inputProps}
        className={resultClassName}
        onChange={handleTextArea}
        placeholder={args.placeholder}
        maxLength={args.maxLength}
        ref={ref}
        readOnly={readOnly}
        autoComplete={args.autoComplete}
      />
    );
  }
);

Textarea.displayName = "textarea";
