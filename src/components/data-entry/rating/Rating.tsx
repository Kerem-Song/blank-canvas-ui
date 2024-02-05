import '@styles/rating.css';

import StarIcon from '@assets/icons/ic_star.svg?react';
import StarBorderIcon from '@assets/icons/ic_star_border.svg?react';
import { useControlled } from '@hooks/useControlled';
import { composeRef } from '@modules/utils/composeRef/composeRef';
import classNames from 'classnames';
import * as React from 'react';

import { RatingProps } from './Rating.types';
import { ratingClasses as classes } from './ratingClasses';
import { RatingItem } from './RatingItem';

/**
 * `precision` 에 따라 가장 가까운 숫자 찾기.
 * @see https://stackoverflow.com/questions/43890561/how-to-round-number-to-the-closest-50-in-javascript
 */
function roundValueToPrecision(value: number | null, precision: number) {
  if (value === null) return value;

  const nearest = Math.round(value / precision) * precision;
  const decimalPart = precision.toString().split('.')[1]?.length || 0;
  return Number(nearest.toFixed(decimalPart));
}

const starBorderIcon = <StarBorderIcon color="rgba(0, 0, 0, 0.26)" />;
const starIcon = <StarIcon color="rgb(250, 175, 0)" />;

export const Rating = React.forwardRef(function Rating(
  props: RatingProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    name: nameProp,
    precision = 1,
    max = 5,
    readOnly = false,
    disabled = false,
    highlightSelectedOnly = false,
    size = 'md',
    defaultValue = null,
    value: valueProp,
    emptyIcon = starBorderIcon,
    filledIcon = starIcon,
    IconContainerComponent,
    onChange,
    className,
    style,
    ...other
  } = props ?? {};

  const defaultId = React.useId();
  const name = nameProp ?? defaultId;

  const [valueState, setValueState] = useControlled({
    controlled: valueProp,
    defaultValue: defaultValue,
  });
  const [{ hover, focus }, setState] = React.useState({ hover: -1, focus: -1 });
  const [isFocused, setIsFocused] = React.useState(false);
  const [emptyValueFocused, setEmptyValueFocused] = React.useState(false);
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const handleRef = composeRef(rootRef, ref);

  const selectedValue = roundValueToPrecision(valueState, precision);
  let value = selectedValue;
  if (hover !== -1) value = hover;
  if (focus !== -1) value = focus;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value === '' ? null : parseFloat(e.target.value);

    if (hover !== -1) newValue = hover;

    setValueState(newValue);

    if (onChange) onChange(e, newValue);
  };

  const handleClear = (e: React.MouseEvent<HTMLInputElement>) => {
    // 클릭이 마우스에 의한 것인지 키보드에 의한 것인지 구별
    // 키보드 이벤트 무사하기
    if (e.clientX === 0 && e.clientY === 0) return;

    const newHover = -1;

    setState({ hover: newHover, focus: newHover });
    setIsFocused(false);
    setValueState(null);

    if (onChange && parseFloat(e.currentTarget.value) === selectedValue)
      onChange(e, null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rootNode = rootRef.current;

    if (!rootNode) return;

    const { width, left } = rootNode.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    // `precision/2` 아이콘 사이에 마우스를 가져가면 정밀도 규칙에 따라 가장 가까운 숫자가 선택.
    const newHover = roundValueToPrecision(
      max * percent + precision / 2,
      precision,
    ) as number;

    setEmptyValueFocused(false);
    setIsFocused(false);
    setState((prev) =>
      prev.hover === newHover && prev.focus === newHover
        ? prev
        : {
            hover: newHover,
            focus: newHover,
          },
    );
  };

  const handleMouseLeave = () => {
    const newHover = -1;

    setState({ hover: newHover, focus: newHover });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const newFocus = parseFloat(e.currentTarget.value);

    setIsFocused(true);
    setState((prev) => ({ hover: prev.hover, focus: newFocus }));
  };

  const handleBlur = () => {
    if (hover !== -1) return;

    const newFocus = -1;

    setIsFocused(false);
    setState((prev) => ({ hover: prev.hover, focus: newFocus }));
  };

  const rootClassName = classNames(classes.root, {
    // disabled
    [classes.disabled]: disabled,
    // readOnly
    [classes.readOnly]: readOnly,
    // focusVisible
    [classes.focusVisible]: isFocused,
    // size
    [classes.sizeSmall]: size === 'sm',
    [classes.sizeMedium]: size === 'md',
    [classes.sizeLarge]: size === 'lg',
    className,
  });

  const fontSize = typeof size === 'number' ? { fontSize: `${size}px` } : {};
  const rootStyle: React.CSSProperties = { ...fontSize, ...style };

  const ratingItemProps = {
    classes,
    name,
    readOnly,
    disabled,
    activeRatingValue: value,
    selectedRatingValue: selectedValue,
    highlightSelectedOnly,
    hover,
    focus,
    emptyIcon,
    filledIcon,
    IconContainerComponent,
    onChange: handleChange,
    onClick: handleClear,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return (
    <span
      ref={handleRef}
      onMouseMove={readOnly || disabled ? undefined : handleMouseMove}
      onMouseLeave={readOnly || disabled ? undefined : handleMouseLeave}
      className={rootClassName}
      style={rootStyle}
      {...other}
    >
      {[...new Array(max)].map((_, index) => {
        const itemValue = index + 1;
        const isActive =
          value !== null &&
          itemValue === Math.ceil(value) &&
          (hover !== -1 || focus !== -1);

        if (precision < 1) {
          const items = Array.from(new Array(1 / precision));

          return (
            <span
              key={index}
              className={classNames(classes.decimal, { [classes.iconActive]: isActive })}
            >
              {items.map((_, indexDecimal) => {
                const itemDecimalValue = roundValueToPrecision(
                  itemValue - 1 + (indexDecimal + 1) * precision,
                  precision,
                ) as number;

                return (
                  <RatingItem
                    {...ratingItemProps}
                    key={itemDecimalValue}
                    isActive={false}
                    itemValue={itemDecimalValue}
                    labelProps={{
                      style:
                        items.length - 1 === indexDecimal
                          ? {}
                          : {
                              width:
                                itemDecimalValue === value
                                  ? `${(indexDecimal + 1) * precision * 100}%`
                                  : '0%',
                              overflow: 'hidden',
                              position: 'absolute',
                            },
                    }}
                  />
                );
              })}
            </span>
          );
        }

        return (
          <RatingItem
            key={index}
            {...ratingItemProps}
            isActive={isActive}
            itemValue={itemValue}
          />
        );
      })}
      {!readOnly && !disabled && (
        <label
          className={classNames(classes.label, {
            [classes.labelEmptyValueActive]: emptyValueFocused,
          })}
        >
          <input
            type="radio"
            className={classes.visuallyHiddenInput}
            id={`${name}-empty`}
            name={name}
            value={''}
            checked={selectedValue == null}
            onFocus={() => setEmptyValueFocused(true)}
            onBlur={() => setEmptyValueFocused(false)}
            onChange={handleChange}
          />
        </label>
      )}
    </span>
  );
});
