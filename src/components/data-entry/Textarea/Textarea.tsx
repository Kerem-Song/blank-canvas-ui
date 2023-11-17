import classNames from 'classnames';
import React, { InputHTMLAttributes, forwardRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export interface ITextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 숫자 카운터의 최대 길이('showCount' true일때만 확인 가능)
   * @default 0
   */
  maxLength?: number;

  /**
   * 숫자 카운터 노출 유무
   * @default false
   */
  showCount?: boolean;

  /**
   * Textarea의 최대 길이(길이 제한)
   */
  maxRows?: number;

  /**
   * Textarea의 최소 길이
   */
  minRows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>((args, ref) => {
  const { style, readOnly, ...inputProps } = args;

  const handleTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      return args.onChange?.(e);
    },
    [args],
  );

  const resultClassName = classNames('textarea textarea-border', args.className);

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
});

Textarea.displayName = 'textarea';
