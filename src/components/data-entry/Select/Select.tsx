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

export interface ISelect<T extends object> extends InputHTMLAttributes<HTMLInputElement> {
  bordered?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  placement?: string; //
  open?: boolean;
  status?: string; //
  suffixIcon?: ReactNode;
  placeholder?: string;
  defaultValue?: string;
  displayLabel?: keyof T;
  valuePath?: keyof T;
  items?: T[];
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void;
}

function SelectFunc<T extends AnyObject>(
  props: ISelect<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    bordered,
    defaultOpen,
    defaultValue,
    disabled,
    placeholder,
    placement,
    open,
    status,
    suffixIcon,
    options,
    displayLabel,
    valuePath,
    items,
    onChange,
    ...inputProps
  } = props;
  const width = '100px';
  const [list, setList] =
    useState<Array<{ label: string; value: string; disabled?: boolean }>>();
  const [currentValue, setCurrentValue] = useState<string>(
    defaultValue ?? placeholder ?? '',
  );
  const [showOptions, setShowOptions] = useState<boolean>(defaultOpen ?? false);
  const [hoverText, setHoverText] = useState('');
  const [indexNum, setIndexNum] = useState<number>(0);
  const selectListRef = useRef<HTMLUListElement>(null);

  const onChangeCurrentValue = (e: React.MouseEvent<HTMLElement>) => {
    const text = e.target as HTMLElement;
    setCurrentValue(text.innerText);
    setShowOptions((prev) => !prev);
  };

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    let flag = false;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIndexNum((idx) => idx + 1);

        if (
          selectListRef.current &&
          selectListRef.current.childElementCount <= indexNum + 1
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
    }
  };

  useEffect(() => {
    if (options) {
      setList(options);
      if (hoverText === '') {
        setHoverText(options[0].value);
        // setHoverText(list.)
      }
    } else {
      const key = displayLabel ?? 'label';
      const valueKey = valuePath ?? 'value';
      const temp = items?.map((x) => ({
        label: x[key],
        value: x[valueKey],
      }));
      setList(temp);
      setHoverText(temp ? temp[0].value : '');
    }
  }, []);

  return (
    <div>
      {indexNum}
      <div
        onClick={() => setShowOptions((prev) => !prev)}
        style={{
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '5px',
          width,
        }}
        className={classNames(
          bordered ? 'select-bordered' : 'select-bordered-none',
          'select-overflow',
        )}
      >
        <input
          {...inputProps}
          type="text"
          onKeyDown={handleKeyArrow}
          readOnly
          // style={{ width: '100%' }}
          value={currentValue}
        />
        {suffixIcon ? (
          <span style={{ width: '20px', height: '20px' }}>{suffixIcon}</span>
        ) : (
          <span style={{ width: '20px', height: '20px' }}>&or;</span>
        )}
      </div>

      {(showOptions || open) && (
        <ul
          style={{ border: 'solid 1px', borderRadius: '5px', marginTop: '5px', width }}
          role="listbox"
          ref={selectListRef}
        >
          {list ? (
            list.map((x, idx) => {
              return (
                <li
                  role="option"
                  key={x.value}
                  onMouseEnter={(e) => {
                    setHoverText(e.currentTarget.innerText);
                    setIndexNum(idx);
                  }}
                  onMouseLeave={() => {
                    setHoverText('');
                    setIndexNum(-1);
                  }}
                  className={classNames(
                    { 'select-item-hover': x.value === hoverText },
                    { 'selected-item': x.value === currentValue },
                    'select-overflow',
                  )}
                  onClick={onChangeCurrentValue}
                >
                  {x.value}
                </li>
              );
            })
          ) : (
            <li>No data</li>
          )}
        </ul>
      )}
    </div>
  );
}
export const Select = React.forwardRef(SelectFunc) as <T extends object>(
  props: ISelect<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReactElement;
