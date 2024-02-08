import { KeyboardEvent, useDeferredValue, useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Input } from '@components/data-entry/input/Input';
import { inputUtil } from '@modules/utils/input';
import classNames from 'classnames';

import { AutocompleteProps } from './Autocomplete.types';
import { autoCompleteClasses } from './AutocompleteClasses';

export const Autocomplete = <T extends object>(args: AutocompleteProps<T>) => {
  const [showPopper, setShowPopper] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const referenceElement = useRef<HTMLInputElement | null>(null);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const focusedElement = useRef<HTMLDivElement>(null);
  const [focusedItem, setFocusedItem] = useState<T>();

  const { items, displayName, isError, className } = args;

  const rootClassName = classNames(autoCompleteClasses.root, {}, className);

  useEffect(() => {
    if (focusedElement.current) {
      focusedElement.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedItem]);

  useEffect(() => {
    if (args.defaultValue) {
      if (displayName) {
        const stringfiedDisplayName = String(args.defaultValue[displayName]);
        setSearch(stringfiedDisplayName);
      } else {
        const stringfiedVal = String(args.defaultValue);
        setSearch(stringfiedVal);
      }
    } else {
      setSearch('');
    }
  }, [args.defaultValue]);

  const { styles, attributes, update } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: 'bottom',
      modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
      strategy: 'fixed',
    },
  );

  const handleShowPopper = () => {
    setShowPopper(true);
    update?.()
      .then(() => console.log('@'))
      .catch((err) => console.log('err', err));
  };

  const handleHidePopper = () => {
    setFocusedItem(undefined);
    setShowPopper(false);
  };

  const handleSearchChange = (value: string) => {
    handleShowPopper();
    setFocusedItem(undefined);
    setSearch(value);
    args.onChangeValue?.(
      items?.find((x) => (displayName ? x[displayName] : String(x)) === value) ||
        args.create?.(value),
    );
  };

  const deferredItems = useDeferredValue(items);
  const filteredList = deferredItems?.filter((x) => {
    if (!search) {
      return true;
    }
    const value = displayName ? String(x[displayName]) : String(x);
    return value.startsWith(search);
  });

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (!filteredList?.length) {
        return;
      }

      if (!showPopper) {
        handleShowPopper();
        return;
      }

      const index = focusedItem
        ? Math.min(filteredList.indexOf(focusedItem) + 1, filteredList.length - 1)
        : 0;
      setFocusedItem(filteredList[index]);
    } else if (e.key === 'ArrowUp') {
      if (!filteredList?.length) {
        return;
      }

      const index = focusedItem ? Math.max(filteredList.indexOf(focusedItem) - 1, 0) : 0;
      setFocusedItem(filteredList[index]);
    }
  };

  return (
    <div style={{ position: 'relative' }} className={rootClassName}>
      <div ref={referenceElement}>
        <Input
          className={classNames(autoCompleteClasses.input, { invalid: isError })}
          onFocus={() => handleShowPopper()}
          onBlur={() => handleHidePopper()}
          onKeyDown={handleInputKeydown}
          customPrefix={args.prefix}
          suffix={args.suffix}
          readOnly={args.readOnly}
          disabled={args.isDisabled}
          placeholder={args.placeholder}
          ref={inputElement}
          onPressEnter={() => {
            if (showPopper) {
              if (focusedItem) {
                const value = displayName
                  ? String(focusedItem[displayName])
                  : String(focusedItem);
                handleSearchChange(value);
                inputUtil.TriggerInputOnChange(inputElement.current, value);
              }
              handleHidePopper();
            } else {
              handleShowPopper();
            }
          }}
          value={search}
          maxLength={args.maxLength}
          onChange={(e) => {
            args.onChange?.(e);
            handleSearchChange(e.target.value);
          }}
        />
      </div>
      <div
        className={autoCompleteClasses.container}
        ref={popperElement}
        style={{
          ...styles.popper,
          width: referenceElement.current?.clientWidth,
          overflowY: 'auto',
          display:
            showPopper && filteredList && filteredList.length > 0 ? 'block' : 'none',
        }}
        {...attributes.popper}
      >
        {filteredList?.map((item: T, index: number) => {
          const display = displayName ? String(item[displayName]) : String(item);
          const focused = item === focusedItem;
          const itemClassName = classNames(autoCompleteClasses.list.root, {
            [autoCompleteClasses.list.focused]: focused,
          });

          return (
            <div
              role="presentation"
              key={index}
              ref={focused ? focusedElement : undefined}
              className={itemClassName}
              style={{ width: '100%' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                if (referenceElement.current) {
                  const value = displayName ? String(item[displayName]) : String(item);
                  handleSearchChange(value);
                  inputUtil.TriggerInputOnChange(inputElement.current, value);
                }
              }}
            >
              <span className={autoCompleteClasses.list.itemName}>
                {inputUtil.replaceKeywordMark(display, search, true)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// export const Autocomplete = forwardRef(AutocompleteComp) as <T extends object>(
//   props: AutocompleteProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
// ) => ReturnType<typeof AutocompleteComp>;
