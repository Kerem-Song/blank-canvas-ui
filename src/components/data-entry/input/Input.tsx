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

import { IInputProps } from './Input.types';
import { inputClasses } from './InputClasses';
import { customClasses } from '@styles/customClasses';

export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [textLength, setTextLength] = useState<number>(
    args.value?.toString().length || 0,
  );
  const {
    showCount,
    isError,
    isSearch,
    isClearable,
    isShowAlwaysClear,
    customPrefix,
    suffix,
    direction = 'inside',
    onPressEnter,
    onPressEsc,
    onSearch,
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
    wrappingType
      ? ''
      : `${args.className ?? ''} ${inputClasses.normal} focus:ring-2 ring-blue-700`,
    {
      [customClasses.h.control]: !wrappingType,
      invalid: isError,
    },
  );

  const inputWrapClassName = classNames(
    wrappingType ? `${args.className ?? ''} ${inputClasses.wrapped}` : '',
    'focus-within:ring-2 ring-blue-700',
    {
      [customClasses.h.control]: !!wrappingType,
      invalid: isError,
    },
  );

  const input = (
    <input
      {...inputProps}
      className={inputClassName}
      onKeyDown={
        onPressEnter || onPressEsc || onSearch || args.onKeyDown ? handleKeyUp : undefined
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
  );

  const wrappedInput = (
    <div className={inputWrapClassName}>
      <div
        className={inputClasses.prefixWrapper}
        onClick={() => inputRef.current?.focus()}
      >
        {customPrefix}
      </div>
      <div className="grow">{input}</div>
      <div
        className={inputClasses.suffixWrapper}
        onClick={() => inputRef.current?.focus()}
      >
        {showCount && direction === 'inside' ? (
          <span className={inputClasses.count}>
            <>
              {textLength}
              {args.maxLength ? `/${args.maxLength}` : undefined}
            </>
          </span>
        ) : null}
        {isSearch ? (
          <>
            <Button
              variant="text"
              size="sm"
              className={inputClasses.button.root}
              onClick={() => {
                inputUtil.TriggerInputOnChange(inputRef.current, '');
                setTextLength(0);
                onSearch?.('');
              }}
            >
              <div
                className={classNames(inputClasses.button.search, {
                  [inputClasses.button.clear]: textLength,
                })}
              />
            </Button>
          </>
        ) : null}
        {isClearable && (isShowAlwaysClear || textLength) && !isSearch ? (
          <Button
            className={inputClasses.button.root}
            variant="text"
            size="sm"
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
            <div className={inputClasses.button.clear} />
          </Button>
        ) : null}
        {suffix}
      </div>
    </div>
  );

  const inputChildren = wrappingType ? wrappedInput : input;

  return inputChildren;
});
