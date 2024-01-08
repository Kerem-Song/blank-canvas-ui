import { Button } from '@components/general/button/Button';
import classNames from 'classnames';
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';
import { util } from 'src/utils/utils';

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
    wrappingType ? '' : `${args.className} luna-input-normal `,
    {
      invalid: isError,
    },
  );

  const inputWrapClassName = classNames(
    wrappingType ? `${args.className} luna-input-wrap` : '',
    {
      invalid: isError,
    },
  );

  const input = (
    <div>
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
    <div className="group">
      <div className={inputWrapClassName}>
        <div className="prefixWrapper">{customPrefix}</div>
        <div className="grow">{input}</div>
        <div className="suffixWrapper">
          {showCount && direction === 'inside' ? (
            <span className="count">
              <>
                {textLength}
                {args.maxLength ? `/${args.maxLength}` : undefined}
              </>
            </span>
          ) : undefined}
          {isSearch ? (
            <Button
              className="input-button"
              variant="text"
              size="sm"
              // startIcon={<IcSearch />}
              onClick={() => {
                util.TriggerInputOnChange(inputRef.current, '');
                setTextLength(0);
                onSearch?.('');
              }}
            >
              <div className={classNames('search', { clear: textLength })} />
            </Button>
          ) : undefined}
          {isClearable && (isShowAlwaysClear || textLength) && !isSearch ? (
            <Button
              variant="text"
              size="sm"
              className="input-button"
              onClick={(e) => {
                util.TriggerInputOnChange(inputRef.current, '');
                setTextLength(0);
                onClear?.();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div className="clear" />
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
        <div className="input-title-counter-wrapper ">
          <span className={classNames('input-label', { light: isLight })}>
            {label}
            {args.required && <span className="required"> *</span>}
          </span>
          {showCount && direction === 'top' ? (
            <span className={classNames(`input-counter ${direction}`)}>
              {textLength || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}
      {inputChildren}
      {direction === 'bottom' ? (
        <div className="input-title-counter-wrapper">
          <span className={classNames('input-label', { light: isLight })}>
            {label}
            {args.required && <span className="required"> *</span>}
          </span>
          {showCount && direction === 'bottom' ? (
            <span className={classNames(`input-counter ${direction}`)}>
              {textLength || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});