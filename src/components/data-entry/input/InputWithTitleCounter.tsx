import classNames from 'classnames';
import { forwardRef, useRef, useState } from 'react';

import { Input } from './Input';
import { inputClasses } from './InputClasses';
import { IInputWithTitleCounterProps } from './InputWithTitleCounter.types';

export const InputWithTitleCounter = forwardRef<
  HTMLInputElement,
  IInputWithTitleCounterProps
>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [textLength, setTextLength] = useState<number>(
    args.value?.toString().length || 0,
  );
  const {
    label,
    isLight,
    showCount,
    direction,
    isError,
    size,
    isSearch,
    isClearable,
    isShowAlwaysClear,
    customPrefix,
    suffix,
    onPressEnter,
    onSearch,
    onPressEsc,
    onClear,
    ...inputProps
  } = args;

  return (
    <div>
      {direction !== 'bottom' ? (
        <div className={inputClasses.titleCounterWrapper}>
          <span className={classNames(inputClasses.label, { light: isLight })}>
            {label}
            {args.required && <span className={inputClasses.required}> *</span>}
          </span>
          {showCount && direction === 'top' ? (
            <span className={classNames(`${inputClasses.counter} ${direction}`)}>
              {textLength || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}
      {
        <Input
          showCount={showCount}
          isSearch={isSearch}
          isClearable={isClearable}
          customPrefix={customPrefix}
          suffix={suffix}
          direction={direction}
          {...inputProps}
        />
      }
      {direction === 'bottom' ? (
        <div className={inputClasses.titleCounterWrapper}>
          <span className={classNames(inputClasses.label, { light: isLight })}>
            {label}
            {args.required && <span className={inputClasses.required}> *</span>}
          </span>
          {showCount && direction === 'bottom' ? (
            <span className={classNames(`${inputClasses.counter} ${direction}`)}>
              {textLength || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
