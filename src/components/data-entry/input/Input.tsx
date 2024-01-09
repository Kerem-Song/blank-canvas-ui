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

import { IInputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [textLength, setTextLength] = useState<number>(
    args.value?.toString().length || 0,
  );
  const {
    prefix = 'bc',
    showCount,
    isError,
    isSearch,
    isClearable,
    isShowAlwaysClear,
    customPrefix,
    suffix,
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
    wrappingType ? '' : `${args.className} bc-input-normal`,
    'group/input-focus-within:ring-blue-500',
    {
      invalid: isError,
    },
  );

  const inputWrapClassName = classNames(
    wrappingType ? `${args.className} bc-input-wrap` : '',
    'group/input-focus-within:ring-blue-500',
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
          onPressEnter || onPressEsc || onSearch || args.onKeyDown
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
    <div className="group/input">
      <div className={inputWrapClassName}>
        <div className="bc-prefixWrapper">{customPrefix}</div>
        <div className="grow">{input}</div>
        <div className="bc-suffixWrapper">
          {showCount ? (
            <span className="bc-count">
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
                className="bc-input-button"
                onClick={() => {
                  util.TriggerInputOnChange(inputRef.current, '');
                  setTextLength(0);
                  onSearch?.('');
                }}
              >
                <div className={classNames('bc-search', { clear: textLength })} />
              </Button>
            </>
          ) : null}
          {isClearable && (isShowAlwaysClear || textLength) && !isSearch ? (
            <Button
              className="bc-input-button"
              variant="text"
              size="sm"
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
              <div className="bc-clear" />
            </Button>
          ) : null}
          {suffix}
        </div>
      </div>
    </div>
  );

  const inputChildren = wrappingType ? wrappedInput : input;

  return inputChildren;
});
