import '@styles/textarea.css';

import classNames from 'classnames';
import { forwardRef, useCallback, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { textareaClasses } from './TextareaClasses';
import { TitleCounterProps } from './TextareaWithTitleCounter.types';

export const TextAreaWithTitleCounter = forwardRef<
  HTMLTextAreaElement,
  TitleCounterProps
>((args, ref) => {
  const {
    style,
    label,
    isLight,
    showCount,
    required,
    readOnly,
    isError,
    direction,
    ...inputProps
  } = args;
  const [count, setCount] = useState<number>();

  const rootClassName = classNames(textareaClasses.wrapper, args.className, 'group');
  const textareaClassName = classNames(textareaClasses.root, args.className, {
    invalid: isError,
  });

  const handleTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value?.length);
      return args.onChange?.(e);
    },
    [args],
  );

  return (
    <div className={rootClassName}>
      {direction !== 'bottom' ? (
        <div className={textareaClasses.titleCounterWrapper}>
          <span className={classNames(textareaClasses.label, { light: isLight })}>
            {label}
            {required && <span className="required"> *</span>}
          </span>
          {showCount && direction === 'top' ? (
            <span className={classNames(`${textareaClasses.counter} ${direction}`)}>
              {count || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className={classNames(
          `${textareaClasses.titleCounterWrapper} ${direction}`,
          { invalid: isError },
          { 'group-focus-within:border-blue-500': direction === 'inside' },
        )}
      >
        <TextareaAutosize
          {...inputProps}
          className={classNames(textareaClassName)}
          onChange={handleTextArea}
          placeholder={args.placeholder}
          maxLength={args.maxLength}
          ref={ref}
          readOnly={readOnly}
          autoComplete={args.autoComplete ? 'true' : 'false'}
          disabled={args.disabled}
        />
        {showCount && direction === 'inside' ? (
          <p className={`${textareaClasses.counter} ${direction}`}>
            {count || 0}
            {`/${args.maxLength}`}
          </p>
        ) : null}
      </div>
      {direction === 'bottom' ? (
        <div className={`${textareaClasses.titleCounterWrapper}`}>
          <span className={classNames(textareaClasses.label, { light: isLight })}>
            {label}
            {required && <span className="required"> *</span>}
          </span>
          {showCount && direction === 'bottom' ? (
            <span className={classNames(`${textareaClasses.counter} ${direction}`)}>
              {count || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
