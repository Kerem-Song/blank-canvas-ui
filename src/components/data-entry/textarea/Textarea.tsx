import React, { forwardRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

import { ITextareaProps } from './Textarea.types';
import { textareaClasses } from './TextareaClasses';

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>((args, ref) => {
  const { style, readOnly, isError, direction, ...inputProps } = args;

  const handleTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      return args.onChange?.(e);
    },
    [args],
  );

  const resultClassName = classNames(
    textareaClasses.root,
    direction ?? textareaClasses.border,
    args.className,
    {
      invalid: isError,
    },
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
      autoComplete={args.autoComplete ? 'true' : 'false'}
      disabled={args.disabled}
    />
  );
});

Textarea.displayName = 'bc_textarea';
