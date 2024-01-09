import classNames from 'classnames';
import { forwardRef, useCallback, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { TitleCounterProps } from './TextareaWithTitleCounter.types';

export const TextAreaWithTitleCounter = forwardRef<
  HTMLTextAreaElement,
  TitleCounterProps
>((args, ref) => {
  const {
    prefix = 'bc',
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

  const resultClassName = classNames('bc-textarea', args.className, {
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
    <div className="bc-wrapper group">
      {direction !== 'bottom' ? (
        <div className="bc-textarea-title-counter-wrapper ">
          <span className={classNames('bc-textarea-label', { light: isLight })}>
            {label}
            {required && <span className="required"> *</span>}
          </span>
          {showCount && direction === 'top' ? (
            <span className={classNames(`bc-textarea-counter ${direction}`)}>
              {count || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className={classNames(
          `bc-textarea-title-counter-wrapper ${direction}`,
          { invalid: isError },
          { 'group-focus-within:border-blue-400': direction === 'inside' },
        )}
      >
        <TextareaAutosize
          {...inputProps}
          className={classNames(resultClassName)}
          onChange={handleTextArea}
          placeholder={args.placeholder}
          maxLength={args.maxLength}
          ref={ref}
          readOnly={readOnly}
          autoComplete={args.autoComplete ? 'true' : 'false'}
          disabled={args.disabled}
        />
        {showCount && direction === 'inside' ? (
          <p className={`bc-textarea-counter ${direction}`}>
            {count || 0}
            {`/${args.maxLength}`}
          </p>
        ) : null}
      </div>
      {direction === 'bottom' ? (
        <div className="bc-textarea-title-counter-wrapper">
          <span className={classNames('bc-textarea-label', { light: isLight })}>
            {label}
            {required && <span className="required"> *</span>}
          </span>
          {showCount && direction === 'bottom' ? (
            <span className={classNames(`bc-textarea-counter ${direction}`)}>
              {count || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
