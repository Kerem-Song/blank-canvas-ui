import { Button } from '@components';
import classNames from 'classnames';
import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { util } from 'src/utils/utils';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 숫자 카운터의 최대 길이('showCount' true일때만 확인 가능)
   *
   */
  maxLength?: number;

  /**
   * 숫자 카운터 노출 유무
   * @default false
   */
  showCount?: boolean;

  /**
   * Input의 검색창으로 쓰이는지 아닌지 유무
   * @type boolean
   * @default false
   */
  isSearch?: boolean;

  /**
   * Input에 입력된 글자 수 카운팅('showCount' true일때만 확인 가능)
   */
  textLength?: number;

  /**
   * Input의 에러 유무
   * @default false
   */
  isError?: boolean;

  /**
   * Input clear가능 여부
   * @default false
   */
  isClearable?: boolean;

  /**
   * Input이 항상 클리어 되는지 여부
   * @default false
   */
  isShowAlwaysClear?: boolean;

  /**
   * Input창 앞에 붙는 prefix(아이콘 혹은 기호 등)
   * @type ReactNode
   */
  customPrefix?: ReactNode;

  /**
   * Input창 뒤에 붙는 suffix(아이콘 혹은 기호 등)
   * @type ReactNode
   */
  suffix?: ReactNode;

  /**
   * Input에서 Enter 입력 시 실행되는 함수
   * @param value
   * @returns
   */
  onPressEnter?: (value: string | undefined) => void;

  /**
   * Input이 search 모드일 때 실행되는 함수
   * @param value
   * @returns
   */
  onSearch?: (value: string | undefined) => void;

  /**
   * Input에서 esc누를 때 실행되는 함수
   * @returns
   */
  onPressEsc?: () => void;

  /**
   * Input이 clear될 경우 실행되는 함수
   * @returns
   */
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [textLength, setTextLength] = useState<number>(
    args.value?.toString().length || 0,
  );
  const {
    showCount,
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
    wrappingType ? '' : `${args.className} luna-input-normal`,
    'group/input-focus-within:ring-blue-500',
    {
      invalid: isError,
    },
  );

  const inputWrapClassName = classNames(
    wrappingType ? `${args.className} luna-input-wrap` : '',
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
    <div className="group/input">
      <div className={inputWrapClassName}>
        <div className="prefixWrapper">{customPrefix}</div>
        <div className="grow">{input}</div>
        <div className="suffixWrapper">
          {showCount ? (
            <span className="count">
              <>
                {textLength}
                {args.maxLength ? `/${args.maxLength}` : undefined}
              </>
            </span>
          ) : null}
          {isSearch ? (
            <>
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
            </>
          ) : null}
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
          ) : null}
          {suffix}
        </div>
      </div>
    </div>
  );

  console.log('@is search', isSearch);
  const inputChildren = wrappingType ? wrappedInput : input;

  return inputChildren;
});
