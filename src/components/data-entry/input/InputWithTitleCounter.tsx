import { Button } from '@components/general/button/Button';
import { inputUtil } from '@modules/utils/input';
import classNames from 'classnames';
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';

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

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    args.onKeyDown?.(e);

    switch (e.key) {
      case 'Enter':
        onPressEnter?.(inputRef.current?.value);
        onSearch?.(inputRef.current?.value);
        if (onPressEnter || onSearch) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case 'Escape':
        onPressEsc?.();
        if (onPressEsc) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    args.onChange?.(e);
    setTextLength(e.target.value?.length || 0);
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    args.onBlur?.(e);
    onSearch?.(e.target.value);
  };

  const wrappingType =
    false || showCount || isSearch || isClearable || customPrefix || suffix;

  const inputClassName = classNames(
    wrappingType ? '' : `${args.className} ${inputClasses.normal}`,
    {
      invalid: isError,
    },
  );

  const inputWrapClassName = classNames(
    wrappingType ? `${args.className} ${inputClasses.wrapped}` : '',
    'group-focus-within/inputWithTitleCounter:ring-2 ring-blue-700',
    {
      invalid: isError,
      [inputClasses.hasCustomPrefix]: customPrefix,
    },
  );

  const input = (
    <div className="">
      <input
        {...inputProps}
        className={inputClassName}
        onKeyDown={
          onPressEnter || onSearch || onPressEsc || args.onKeyDown
            ? handleKeyUp
            : undefined
        }
        ref={(current) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(current);
            } else {
              ref.current = current;
            }
          }
          inputRef.current = current;
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        readOnly={args.readOnly}
        title={inputRef.current?.value}
        autoComplete="off"
      />
    </div>
  );

  const wrappedInput = (
    <div className="group/inputWithTitleCounter">
      <div className={inputWrapClassName}>
        <div
          className={classNames(inputClasses.prefixWrapper)}
          onClick={() => inputRef.current?.focus()}
        >
          {customPrefix}
        </div>
        <div className="grow">{input}</div>
        <div
          className={classNames(inputClasses.suffixWrapper)}
          onClick={() => inputRef.current?.focus()}
        >
          {showCount && direction === 'inside' ? (
            <span className={inputClasses.count}>
              <>
                {textLength}
                {args.maxLength ? `/${args.maxLength}` : undefined}
              </>
            </span>
          ) : undefined}
          {isSearch ? (
            <Button
              className={inputClasses.button.root}
              variant="text"
              size="sm"
              // startIcon={<IcSearch />}
              onClick={() => {
                inputUtil.TriggerInputOnChange(inputRef.current, '');
                setTextLength(0);
                onSearch?.('');
              }}
            >
              <div
                className={classNames(inputClasses.button.search, {
                  clear: textLength,
                })}
              />
            </Button>
          ) : undefined}
          {isClearable && (isShowAlwaysClear || textLength) && !isSearch ? (
            <Button
              variant="text"
              size="sm"
              className={inputClasses.button.root}
              onClick={(e) => {
                inputUtil.TriggerInputOnChange(inputRef.current, '');
                setTextLength(0);
                onClear?.();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div className={inputClasses.clear} />
            </Button>
          ) : undefined}
          {suffix}
        </div>
      </div>
    </div>
  );

  const inputChildren = wrappingType ? wrappedInput : input;

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
      {inputChildren}
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
