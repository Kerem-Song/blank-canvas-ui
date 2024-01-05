import classNames from 'classnames';
import React, { forwardRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { ITextareaProps } from './Textarea.types';

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
      disabled={args.disabled}
    />
  );
});

Textarea.displayName = 'textarea';
