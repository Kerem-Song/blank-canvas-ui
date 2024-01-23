import IcArrow from '@assets/icons/ic_select_arrow.svg?react';
import { Input } from '@components';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { AnyObject } from '@models/types/AnyObject';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

import { IMultipleSelectProp } from './Select.types';
import { selectClasses } from './SelectClasses';

function MultiSelectFunc<T extends AnyObject>(
  props: IMultipleSelectProp<T>,
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
    typeof selectWidth !== 'number' ? remUtil.findNumber(selectWidth) : selectWidth;
  const width = tempWidth > 150 ? `${tempWidth}px` : '150px';

  const [init, setInit] = useState(false);
  const [list, setList] =
    useState<Array<{ label: string; value: string; disabled?: boolean }>>();
  const [tmpList, setTmpList] =
    useState<Array<{ label: string; value: string; disabled?: boolean }>>();
  const [currentValue, setCurrentValue] = useState<any>(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : [],
  );
  const [showOptions, setShowOptions] = useState<boolean>(defaultOpen ?? false);
  const [hoverText, setHoverText] = useState<string>(''); //색칠...
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [indexNum, setIndexNum] = useState<number>(0);
  const [inputFocus, setInputFocus] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popperUl = useRef<HTMLUListElement>(null);
  const referenceDiv = useRef<HTMLDivElement>(null);
  const { styles, attributes } = usePopper(referenceDiv.current, popperUl.current, {
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
  });

  const onChangeCurrentValue = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const text = (e.target as HTMLElement).innerText;
    onChange(text);
    inputRef.current?.focus();
    console.log('잉?');
  };

  const onChange = (text: string) => {
    if (text === '') {
      return;
    }
    Array.isArray(currentValue) && currentValue.length > 0 && currentValue.includes(text)
      ? setCurrentValue(currentValue.filter((value: string) => value !== text))
      : setCurrentValue([...currentValue, text]);
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
        console.log(e);
        setIndexNum((idx) => idx + 1);

        if (popperUl.current && popperUl.current.childElementCount <= indexNum + 1) {
          setIndexNum(0);
          flag = true;
        }
        list?.map((x, idx) => {
          if (idx === indexNum + 1) {
            console.log(idx, indexNum, x.label, x.disabled);
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
        setSearchKeyword('');
        setShowOptions(false);
        break;
      case 'Enter':
        if (list && list.length > 0) {
          onChange(hoverText);
          setSearchKeyword('');
          setList(tmpList);
        }
        break;
      case 'Backspace':
        if (!searchKeyword) {
          e.preventDefault();
          if (Array.isArray(currentValue) && currentValue.length > 0) {
            const text: string = currentValue[currentValue.length - 1];
            onChange(text);
          }
        }
        break;
    }
  };
  const iconClick = () => {
    if (!disabled) {
      if (!showOptions) {
        setShowOptions(true);
      } else {
        setSearchKeyword('');
        setList(tmpList);
        setShowOptions(false);
      }
      setInputFocus(true);
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOptions(true);
    if (e.target.value.trim() === '') {
      setList(tmpList);
      setSearchKeyword('');
      return;
    }
    setSearchKeyword(e.target.value.trim());
    const searchList = tmpList
      ? tmpList.filter((element) => element.label.includes(e.target.value.trim()))
      : [];
    setList(searchList);
    const findNum = searchList.findIndex((x) => !x.disabled);
    setHoverText(findNum !== -1 ? searchList[findNum].label : '');
  };

  const selectedClass = (x: string, y?: boolean) => {
    const value =
      Array.isArray(currentValue) && currentValue.length > 0 && currentValue.includes(x)
        ? selectClasses.list.item
        : '';
    return value;
  };

  const closeIconClick = (e: React.MouseEvent<HTMLElement>, text: string) => {
    e.stopPropagation();
    if (Array.isArray(currentValue) && currentValue.length > 0) {
      onChange(text);
    }
    inputRef.current?.focus();
  };

  useOutsideClick(selectRef, () => {
    setInputFocus(false);
    setShowOptions(false);
    setSearchKeyword('');
    setList(tmpList);
  });

  useEffect(() => {
    if (options) {
      setList(options);
      setTmpList(options);
      const index = options.findIndex((x) => !x.disabled);
      if (hoverText === '') {
        if (index > -1) {
          setHoverText(options[index].label);
          setIndexNum(index);
        } else {
          setHoverText('');
        }
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
      setHoverText(temp && temp.length > 0 ? temp[0].label : '');
    }
  }, []);

  useEffect(() => {
    setInit(true);
  }, []);

  const rootClassName = classNames(selectClasses.root, selectClasses.multiSelect.root);

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
    <div className={rootClassName} ref={selectRef} onClick={iconClick}>
      <div
        ref={referenceDiv}
        style={{
          ...style,
          minWidth: width,
        }}
        className={classNames(selectClassName, className)}
      >
        <div className={classNames(selectClasses.multiSelect.tag.area)}>
          {Array.isArray(currentValue) && currentValue.length > 0 ? (
            currentValue.map((x: string) => (
              <span key={x} className={classNames(selectClasses.multiSelect.tag.root)}>
                <span key={x}>{x}</span>
                <span
                  key={x}
                  onClick={(e) => closeIconClick(e, x)}
                  className={classNames(selectClasses.multiSelect.tag.closeIcon)}
                >
                  &#88;
                </span>
              </span>
            ))
          ) : (
            <></>
          )}
          <div className={classNames(selectClasses.multiSelect.inputArea)}>
            <span>{searchKeyword}</span>
            <Input
              className={classNames({
                [selectClasses.disabled]: disabled,
              })}
              value={searchKeyword}
              type="text"
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
              onChange={inputOnChange}
              onKeyDown={handleKeyArrow}
            />
          </div>
          {!searchKeyword && Array.isArray(currentValue) && currentValue.length === 0 && (
            <span
              className={classNames({
                [selectClasses.placeholder]:
                  placeholder && Array.isArray(currentValue) && currentValue.length === 0,
              })}
            >
              {placeholder}
            </span>
          )}
        </div>

        {suffixIcon ? (
          <div
            className={classNames(
              disabled ? selectClasses.icon.disabled : selectClasses.icon.root,
            )}
          >
            {suffixIcon}
          </div>
        ) : (
          <div
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
          ref={popperUl}
          className={classNames(selectClasses.list.root)}
        >
          {list && list.length > 0 ? (
            list.map((x, idx) => {
              return !x.disabled ? (
                <li
                  role="option"
                  key={x.label}
                  onClick={(e) => {
                    onChangeCurrentValue(e);
                  }}
                  onMouseEnter={(e) => {
                    setHoverText(e.currentTarget.innerText);
                    setIndexNum(idx);
                  }}
                  onMouseLeave={() => {
                    !showOptions && setHoverText('');
                    setIndexNum(idx);
                  }}
                  className={classNames(
                    Array.isArray(currentValue) &&
                      currentValue.length > 0 &&
                      currentValue.includes(x.label)
                      ? selectedClass(x.label)
                      : { [selectClasses.list.item]: x.label === currentValue },
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
                    // setShowOptions(true);
                    e.stopPropagation();
                    e.preventDefault();
                  }}
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
export const MultiSelect = React.forwardRef(MultiSelectFunc) as <T extends object>(
  props: IMultipleSelectProp<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReactElement;