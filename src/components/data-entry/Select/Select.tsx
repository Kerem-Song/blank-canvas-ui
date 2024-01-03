import { AnyObject } from '@models';
import classNames from 'classnames';
import React, {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { util } from 'src/utils/utils';

export interface ISelectProp<T extends object>
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * select의 선 표시 여부
   * @default false
   * @type boolean
   */
  bordered?: boolean;
  /**
   * select 옵션을 처음에 표시할지 선택
   * @default false
   * @type boolean
   */
  defaultOpen?: boolean;
  /**
   * select 옵션을 처음에 표시할지 선택
   * @default false
   * @type boolean
   */
  disabled?: boolean;
  /**
   * select 표시 위치 지정
   * @default 'right'
   * @type 'top' | 'bottom' | 'right' | 'left'
   */
  placement?: 'top' | 'bottom' | 'right' | 'left';
  /**
   * select 옵션을 표시할지 선택
   * @default false
   * @type boolean
   */
  open?: boolean;
  /**
   * select 오류 또는 경고를 테두리 색으로 표시
   * @default
   * @type 'error' | 'warning'
   */
  status?: 'error' | 'warning';
  /**
   * select 오른쪽 끝 화살표 대신 아이콘 삽입
   * @default
   * @type ReactNode
   */
  suffixIcon?: ReactNode;
  /**
   * select placeholder 작성
   * @default
   * @type string
   */
  placeholder?: string;
  /**
   * select default 값 지정
   * @default
   * @type string
   */
  defaultValue?: string;

  /**
   * items과 세트로 사용
   * select에 보여지는 값
   * @default
   * @type keyof T
   */
  displayLabel?: keyof T;
  /**
   * items과 세트로 사용
   * select에서 사용되는 value 값
   * @default
   * @type keyof T
   */
  valuePath?: keyof T;
  /**
   * displayLabel,valuePath와 같이 사용
   * option으로 지정되지 않은 api에서 보내준 값을 바로 사용할 수 있음
   * @default
   * @type T[]
   */
  items?: T[];
  /**
   * select의 옵션값 위치 변경(위/아래, 왼/오)
   * @default [0,0]
   * @type [number, number]
   */
  offset?: [number, number];
  /**
   * select width 지정
   * 크기를 넣으면 px로 적용
   * 최소값 150px
   * @default '150px'
   * @type string | number;
   */
  selectWidth?: string | number;
  /**
   * select option 값 지정
   * @default
   * @type Array<{ label: string; value: string; disabled?: boolean }>
   */
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
}

function SelectFunc<T extends AnyObject>(
  props: ISelectProp<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    bordered,
    defaultOpen,
    defaultValue,
    disabled,
    placeholder,
    placement = 'bottom',
    open,
    offset = [0, 0],
    status,
    suffixIcon,
    options,
    displayLabel,
    valuePath,
    items,
    selectWidth = 150,
    className,
    style,
    ...inputProps
  } = props;
  const tempWidth =
    typeof selectWidth !== 'number' ? util.findNumber(selectWidth) : selectWidth;
  const width = tempWidth > 150 ? `${tempWidth}px` : '150px';

  const [init, setInit] = useState(false);
  const [list, setList] =
    useState<Array<{ label: string; value: string; disabled?: boolean }>>();
  const [currentValue, setCurrentValue] = useState<string>(
    defaultValue ?? placeholder ?? '',
  );
  const [showOptions, setShowOptions] = useState<boolean>(defaultOpen ?? false);
  const [hoverText, setHoverText] = useState('');
  const [indexNum, setIndexNum] = useState<number>(0);
  const [inputFoucs, setInputFoucs] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popperElement = useRef<HTMLUListElement>(null);

  const onChangeCurrentValue = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const text = e.target as HTMLElement;
    setCurrentValue(text.innerText);
    setShowOptions((pre) => !pre);
    inputRef.current?.focus();
  };

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    let flag = false;
    switch (e.code) {
      case 'ArrowDown':
        e.preventDefault();
        if (!showOptions) {
          setShowOptions((pre) => !pre);
          break;
        }
        setIndexNum((idx) => idx + 1);

        if (
          popperElement.current &&
          popperElement.current.childElementCount <= indexNum + 1
        ) {
          setIndexNum(0);
          flag = true;
        }
        list?.map((x, idx) => {
          if (idx === indexNum + 1) {
            setHoverText(x.value);
          }
        });
        if (flag) {
          setHoverText(list ? list[0].value : '');
          flag = false;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!showOptions) {
          setShowOptions((pre) => !pre);
          break;
        }
        setIndexNum((idx) => idx - 1);
        if (indexNum <= 0) {
          const tmpNum = list ? list.length - 1 : 0;
          setIndexNum(tmpNum);
          flag = true;
        }

        list?.map((x, idx) => {
          if (idx === indexNum - 1) {
            setHoverText(x.value);
          }
        });
        if (flag) {
          setHoverText(list ? list[list.length - 1].value : '');
          flag = false;
        }
        break;
      case 'Escape':
        e.preventDefault();
        setHoverText('');
        setIndexNum(0);
        break;
      case 'Enter':
      case 'Space':
        e.preventDefault();
        setCurrentValue(list ? list[indexNum].value : '');
        setShowOptions((pre) => !pre);
        break;
    }
  };

  const iconClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowOptions((pre) => !pre);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (options) {
      setList(options);
      if (hoverText === '') {
        setHoverText(options ? options[0].value : '');
      }
    } else {
      const key = displayLabel ?? 'label';
      const valueKey = valuePath ?? 'value';
      const temp = items?.map((x) => ({
        label: x[key],
        value: x[valueKey],
        disabled: x['disabled'],
      }));
      setList(temp);
      setHoverText(temp ? temp[0].value : '');
    }
  }, []);

  const inputBlur = (e: Event) => {
    const temp = e.target as HTMLElement;
    if (temp.classList.contains('select-list-disabled')) {
      setShowOptions(true);
      return;
    }
    if (selectRef.current && !selectRef.current.contains(temp)) {
      setInputFoucs(false);
      setShowOptions(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    window.addEventListener('click', inputBlur);
    return () => {
      window.removeEventListener('click', inputBlur);
    };
  }, []);

  const referenceElement = useRef<HTMLDivElement>(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: placement,

      modifiers: [
        {
          name: 'offset',
          options: {
            offset: offset,
          },
        },
      ],

      strategy: 'fixed',
    },
  );

  useEffect(() => {
    return () => {
      setInit(true);
    };
  }, []);

  return (
    <div
      id="container"
      className={classNames({ 'select-disabled': disabled }, 'select-container')}
      ref={selectRef}
      onClick={() => {
        !disabled ? setShowOptions((pre) => !pre) : undefined;
      }}
    >
      <div
        ref={referenceElement}
        style={{
          ...style,
          width,
        }}
        className={classNames(
          inputFoucs && !status ? 'ring-2 ring-blue-500/75' : 'ring-2 ring-blue-500/0',
          { 'ring-2 ring-red-500': status === 'error' },
          { 'ring-2 ring-yellow-400 ring-opacity-90': status === 'warning' },
          bordered === false ? 'select-bordered-none' : 'select-bordered',
          'select-referenceElement',
          className,
        )}
      >
        <input
          {...inputProps}
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
          onFocus={() => {
            !disabled ? setInputFoucs(true) : undefined;
          }}
          type="text"
          onKeyDown={handleKeyArrow}
          readOnly
          className={classNames({ 'select-disabled': disabled })}
          value={currentValue}
        />

        {suffixIcon ? (
          <div onClick={iconClick} className={classNames('select-icon')}>
            {suffixIcon}
          </div>
        ) : (
          <div onClick={iconClick} className={classNames('select-icon')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 9L12 6"
                stroke="#B5B4B4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {ReactDOM.createPortal(
        <ul
          {...attributes.popper}
          style={{
            ...styles.popper,
            ...style,
            width,
            visibility:
              open === undefined
                ? showOptions && init
                  ? 'visible'
                  : 'hidden'
                : open && init
                  ? 'visible'
                  : 'hidden',
          }}
          ref={popperElement}
          className={classNames('select-ul')}
        >
          {list ? (
            list.map((x, idx) => {
              return !x.disabled ? (
                <li
                  role="option"
                  key={x.value}
                  onClick={onChangeCurrentValue}
                  onMouseEnter={(e) => {
                    setHoverText(e.currentTarget.innerText);
                    setIndexNum(idx);
                  }}
                  onMouseLeave={() => {
                    setHoverText('');
                    setIndexNum(idx);
                  }}
                  className={classNames(
                    { 'select-item-hover': x.value === hoverText },
                    { 'selected-item': x.value === currentValue },
                    'select-overflow',
                  )}
                >
                  {x.value}
                </li>
              ) : (
                <li
                  role="option"
                  onClick={() => {}}
                  className={classNames(
                    'select-overflow select-disabled select-list-disabled',
                  )}
                >
                  {x.value}
                </li>
              );
            })
          ) : (
            <li>No data</li>
          )}
        </ul>,
        document.querySelector('body')!,
      )}
    </div>
  );
}
export const Select = React.forwardRef(SelectFunc) as <T extends object>(
  props: ISelectProp<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReactElement;
