import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import IcArrow from '@assets/icons/ic_select_arrow.svg?react';
import { Input } from '@components';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { AnyObject } from '@models/types/AnyObject';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';

import { ISelectProp } from './Select.types';
import { selectClasses } from './SelectClasses';

function SelectFunc<T extends AnyObject>(
  props: ISelectProp<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    onChange,
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
  const [currentValue, setCurrentValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(defaultOpen ?? false);
  const [hoverText, setHoverText] = useState('');
  const [indexNum, setIndexNum] = useState<number>(0);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popperElement = useRef<HTMLUListElement>(null);
  const referenceElement = useRef<HTMLDivElement>(null);
  const { styles, attributes, update } = usePopper(
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

  const onChangeCurrentValue = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const text = e.target as HTMLElement;
    findUserValue(text.innerText);
    setCurrentValue(text.innerText);
    setList(tmpList);
    setShowOptions((pre) => !pre);
    setSelectedValue(text.innerText);
  };

  const findUserValue = (val: string) => {
    const value = list?.filter((x) => x.label === val)[0].value;
    onChange?.(value ?? null);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    setShowOptions(true);
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
    }
  }, [currentValue]);

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    let flag = false;
    switch (e.code) {
      case 'ArrowDown':
        e.preventDefault();
        if (!showOptions) {
          setShowOptions((pre) => !pre);
          popperUpdate();
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
          popperUpdate();
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
        popperUpdate();

        if (!disabled) setShowOptions((pre) => !pre);

        if (!showOptions) {
          setList(tmpList);
          setCurrentValue(selectedValue);
          findUserValue(selectedValue);
        } else {
          setCurrentValue(hoverText);
          setSelectedValue(hoverText);
          findUserValue(hoverText);
        }

        break;
      case 'Backspace':
        setShowOptions(true);
        break;
      case 'Tab':
        if (!disabled) {
          setCurrentValue(selectedValue);
        }
        setShowOptions(false);
        break;
    }
  };

  const popperUpdate = () => {
    void update?.();
  };

  const iconClick = () => {
    if (!disabled) {
      if (!showOptions) {
        popperUpdate();
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
    }
  };

  useEffect(() => {
    if (options) {
      setList(options);
      setTmpList(options);
      if (hoverText === '') {
        setHoverText(options.length > 0 ? options[0].label : '');
      }
      if (defaultValue) {
        const label = options?.filter((x) => x.value === defaultValue)[0].label;
        setCurrentValue(label);
        setSelectedValue(label);
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
      if (defaultValue) {
        const label = temp?.filter((x) => x.value === defaultValue)[0].label;
        setCurrentValue(label ?? '');
        setSelectedValue(label ?? '');
      }

      setHoverText(temp?.length ? temp[0].label : '');
    }
  }, []);

  useOutsideClick(selectRef, () => {
    setShowOptions(false);
    setCurrentValue(selectedValue);
    inputRef.current?.blur();
  });

  useEffect(() => {
    setInit(true);
  }, []);

  const rootClassName = classNames(selectClasses.root, {
    [selectClasses.placeholder]: placeholder && currentValue === '',
  });

  const selectClassName = classNames(
    selectClasses.referenceElement,
    {
      [selectClasses.status.error]: status === 'error' || isError,
      [selectClasses.status.warning]: status === 'warning',
    },
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
        <Input
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
          autoComplete="off"
          onClick={iconClick}
          placeholder={placeholderText}
          type="text"
          onChange={(e) => {
            inputOnChange(e);
          }}
          onKeyDown={handleKeyArrow}
          disabled={disabled}
          readOnly={!filterOption || disabled}
          className={classNames({ [selectClasses.disabled]: disabled })}
          value={currentValue}
          suffix={
            suffixIcon ? (
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
            )
          }
        />
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
                    e.stopPropagation();
                    e.preventDefault();
                    setShowOptions(true);
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
