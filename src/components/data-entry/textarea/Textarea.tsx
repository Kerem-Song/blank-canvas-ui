import '@styles/textarea.css';

import classNames from 'classnames';
import React, { forwardRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { ITextareaProps } from './Textarea.types';
import { textareaClasses } from './TextareaClasses';

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>((args, ref) => {
  const { style, readOnly, isError, ...inputProps } = args;

  const handleTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      return args.onChange?.(e);
    },
    [args],
  );

  const resultClassName = classNames(
    textareaClasses.root,
    textareaClasses.border,
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
      autoComplete={args.autoComplete}
      disabled={args.disabled}
    />
  );
});

Textarea.displayName = 'bc_textarea';
