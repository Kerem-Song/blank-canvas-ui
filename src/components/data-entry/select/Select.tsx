import { AnyObject } from '@models/types/AnyObject';
import classNames from 'classnames';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { util } from 'src/utils/utils';

import { ISelectProp } from './Select.types';

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
    isError,
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
  const [inputFocus, setInputFocus] = useState(false);
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
    if (temp.classList.contains('bc-select-list-disabled')) {
      setShowOptions(true);
      return;
    }
    if (selectRef.current && !selectRef.current.contains(temp)) {
      setInputFocus(false);
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
    setInit(true);
  }, []);

  return (
    <div
      id="container"
      className={classNames({ 'bc-select-disabled': disabled }, 'bc-select-container')}
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
          inputFocus && !status ? 'bc-select-focus' : 'bc-select-focus-none',
          { 'bc-select-error': status === 'error' || isError },
          { 'bc-select-warning': status === 'warning' },
          bordered === false ? 'bc-select-bordered-none' : 'bc-select-bordered',
          'bc-select-referenceElement',
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
            !disabled ? setInputFocus(true) : undefined;
          }}
          type="text"
          onKeyDown={handleKeyArrow}
          readOnly
          className={classNames({ 'bc-select-disabled': disabled })}
          value={currentValue}
        />

        {suffixIcon ? (
          <div onClick={iconClick} className={classNames('bc-select-icon')}>
            {suffixIcon}
          </div>
        ) : (
          <div onClick={iconClick} className={classNames('bc-select-icon')}>
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
            margin: placement === 'left' || placement === 'right' ? '0 8px' : '8px 0',
          }}
          ref={popperElement}
          className={classNames('bc-select-ul')}
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
                    { 'bc-select-item-hover': x.value === hoverText },
                    { 'bc-selected-item': x.value === currentValue },
                    'bc-select-overflow',
                  )}
                >
                  {x.value}
                </li>
              ) : (
                <li
                  role="option"
                  onClick={() => {}}
                  className={classNames(
                    'bc-select-overflow bc-select-disabled bc-select-list-disabled',
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
