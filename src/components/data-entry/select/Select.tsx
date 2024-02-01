import IcArrow from '@assets/icons/ic_select_arrow.svg?react';
import { Input } from '@components';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { AnyObject } from '@models/types/AnyObject';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

import { ISelectProp } from './Select.types';
import { selectClasses } from './SelectClasses';

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
    filterOption = false,
    ...inputProps
  } = props;
  const tempWidth =
    typeof selectWidth !== 'number' ? remUtil.findNumber(selectWidth) : selectWidth;
  const width = tempWidth > 150 ? `${tempWidth}px` : '150px';
  const [placeholderText, setPlaceholderText] = useState(placeholder ?? '');
  const [init, setInit] = useState(false);
  const [list, setList] =
    useState<Array<{ label: string; value: string; disabled?: boolean }>>();
  const [tmpList, setTmpList] =
    useState<Array<{ label: string; value: string; disabled?: boolean }>>();
  const [currentValue, setCurrentValue] = useState<string>(defaultValue ?? '');
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue ?? '');
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
    setList(tmpList);
    setShowOptions((pre) => !pre);
    setSelectedValue(text.innerText);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showOptions) {
      setCurrentValue(e.target.value);
    } else {
      setCurrentValue(e.target.value.replace(currentValue, ''));
      setShowOptions((pre) => !pre);
    }
  };

  useEffect(() => {
    if (inputRef) {
      const text = inputRef.current?.value.toLowerCase() ?? '';
      const searchList = tmpList?.filter((item) =>
        item.label.toLowerCase().includes(text),
      );
      setList(searchList);

      if (selectedValue !== '' && selectedValue.toLowerCase().includes(text)) {
        setHoverText(selectedValue);
      } else {
        setHoverText(searchList && searchList?.length > 0 ? searchList[0].label : '');
      }
      // inputRef.current?.focus();
    }
  }, [currentValue]);

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    let flag = false;
    switch (e.code) {
      case 'ArrowDown':
        e.preventDefault();
        if (!showOptions) {
          setShowOptions((pre) => !pre);
          setPlaceholderText(currentValue);
          setCurrentValue('');
          setList(tmpList);
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
            setHoverText(x.label);
          }
        });
        if (flag) {
          setHoverText(list ? list[0].label : '');
          flag = false;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!showOptions) {
          setShowOptions((pre) => !pre);
          setPlaceholderText(currentValue);
          setCurrentValue('');
          setList(tmpList);
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
            setHoverText(x.label);
          }
        });
        if (flag) {
          setHoverText(list ? list[list.length - 1].label : '');
          flag = false;
        }
        break;
      case 'Escape':
        e.preventDefault();
        setHoverText('');
        setIndexNum(0);

        if (currentValue === '' || !showOptions) {
          setShowOptions(false);
          setCurrentValue(selectedValue);
        } else {
          setCurrentValue('');
          setShowOptions(true);
        }

        break;
      case 'Enter':
        e.preventDefault();
        setShowOptions((pre) => !pre);

        if (!showOptions) {
          setList(tmpList);
          setCurrentValue(selectedValue);
        }

        if (list && list.length > 0) {
          setCurrentValue(hoverText);
          setSelectedValue(hoverText);
        } else {
          setShowOptions(true);
        }

        if (inputRef.current?.selectionStart === 0 && selectedValue === hoverText) {
          setPlaceholderText(selectedValue);
          setCurrentValue(selectedValue);
        }
        break;
      case 'Backspace':
        setShowOptions(true);
        break;
    }
  };

  const iconClick = () => {
    if (!disabled) {
      setInputFocus(true);
      if (!showOptions) {
        setShowOptions(true);
        setList(tmpList);
        setPlaceholderText(selectedValue);

        setCurrentValue('');
      } else {
        if (list && list?.length === tmpList?.length) {
          setShowOptions(false);
          setCurrentValue(selectedValue);
        }
      }
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (options) {
      setList(options);
      setTmpList(options);
      if (hoverText === '') {
        setHoverText(options.length > 0 ? options[0].label : '');
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
      setTmpList(temp);
      setHoverText(temp?.length ? temp[0].label : '');
    }
  }, []);

  useOutsideClick(selectRef, () => {
    setInputFocus(false);
    setShowOptions(false);
    setCurrentValue(selectedValue);
    inputRef.current?.blur();
  });

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

  const rootClassName = classNames(selectClasses.root, {
    [selectClasses.placeholder]: placeholder && currentValue === '',
  });

  const selectClassName = classNames(
    selectClasses.referenceElement,
    {
      [selectClasses.disabled]: disabled,
      [selectClasses.status.error]: status === 'error' || isError,
      [selectClasses.status.warning]: status === 'warning',
    },
    inputFocus && !status ? selectClasses.focus.root : selectClasses.focus.focusNone,
    bordered === false
      ? selectClasses.bordered.borderedNone
      : selectClasses.bordered.root,
  );

  const disabledLiClassName = classNames(
    selectClasses.list.overflow,
    selectClasses.disabled,
    selectClasses.list.disabled,
  );

  return (
    <div className={classNames(rootClassName)} ref={selectRef} onClick={iconClick}>
      <div
        ref={referenceElement}
        style={{
          ...style,
          width,
        }}
        className={classNames(selectClassName, className)}
        onClick={iconClick}
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
          onClick={iconClick}
          placeholder={placeholderText}
          type="text"
          onChange={(e) => {
            inputOnChange(e);
          }}
          onKeyDown={handleKeyArrow}
          readOnly={!filterOption}
          className={classNames({ [selectClasses.disabled]: disabled })}
          value={currentValue}
        />

        {suffixIcon ? (
          <div
            onClick={iconClick}
            className={classNames(
              disabled ? selectClasses.icon.disabled : selectClasses.icon.root,
            )}
          >
            {suffixIcon}
          </div>
        ) : (
          <div
            onClick={iconClick}
            className={classNames(
              disabled ? selectClasses.icon.disabled : selectClasses.icon.root,
            )}
          >
            <IcArrow />
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
          className={classNames(selectClasses.list.root)}
        >
          {list?.length ? (
            list.map((x, idx) => {
              return !x.disabled ? (
                <li
                  role="option"
                  key={x.label}
                  onClick={onChangeCurrentValue}
                  onMouseEnter={(e) => {
                    setHoverText(e.currentTarget.innerText);
                    setIndexNum(idx);
                  }}
                  onMouseLeave={() => {
                    !showOptions && setHoverText('');
                    setIndexNum(idx);
                  }}
                  className={classNames(
                    { [selectClasses.list.item]: x.label === selectedValue },
                    currentValue === '' && placeholderText
                      ? { [selectClasses.list.item]: x.label === placeholderText }
                      : undefined,
                    { [selectClasses.list.hover]: x.label === hoverText },
                    selectClasses.list.overflow,
                  )}
                >
                  {x.label}
                </li>
              ) : (
                <li
                  key={x.label}
                  role="option"
                  onClick={(e) => {
                    console.log(e);
                    e.stopPropagation();
                    e.preventDefault();
                    setShowOptions(true);
                    setInputFocus(true);
                  }}
                  style={{ cursor: 'not-allowed' }}
                  className={classNames(disabledLiClassName)}
                >
                  {x.label}-
                </li>
              );
            })
          ) : (
            <li
              role="option"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ cursor: 'not-allowed' }}
            >
              No data
            </li>
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
