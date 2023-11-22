import { Button, IInputProps } from '@components';
import classNames from 'classnames';
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { util } from 'src/utils/utils';

export interface IInputWithTitleCounterProps extends IInputProps {
  /**
   * Input의 title
   */
  label?: string;

  /**
   * Input에서 노출되는 title과 counter의 위치(label은 값이 없을 경우 노출되지 않음)
   * @type "top" | "bottom" | "inside"
   */
  direction?: 'top' | 'bottom' | 'inside';

  /**
   * Input title의 폰트 굵기(굵게/얇게)
   * @default false
   */
  isLight?: boolean;
}

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
    ...inputProps
  } = args;

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    args.onKeyDown?.(e);

    switch (e.key) {
      case 'Enter':
        args.onPressEnter?.(inputRef.current?.value);
        args.onSearch?.(inputRef.current?.value);
        if (args.onPressEnter || args.onSearch) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case 'Escape':
        args.onPressEsc?.();
        if (args.onPressEsc) {
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
    args.onSearch?.(e.target.value);
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
          args.onPressEnter || args.onSearch || args.onKeyDown ? handleKeyUp : undefined
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
              small
              shape="ghost"
              className="input-button"
              onClick={() => {
                util.TriggerInputOnChange(inputRef.current, '');
                setTextLength(0);
                args.onSearch?.('');
              }}
            >
              <div className={classNames('search', { clear: textLength })} />
            </Button>
          ) : undefined}
          {isClearable && (isShowAlwaysClear || textLength) && !isSearch ? (
            <Button
              small
              shape="ghost"
              className="input-button"
              onClick={(e) => {
                util.TriggerInputOnChange(inputRef.current, '');
                setTextLength(0);
                args.onClear?.();
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
