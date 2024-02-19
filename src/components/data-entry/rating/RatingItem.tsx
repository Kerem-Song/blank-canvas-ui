import React, { useId } from 'react';
import classNames from 'classnames';

import { IconContainerProps } from './Rating.types';
import { RatingClasses } from './ratingClasses';

interface RatingItemProps {
  /**
   * 재정의된 className.
   */
  classes: RatingClasses;
  /**
   * Radio `input` 요소의 이름 속성값.
   */
  name?: string;
  /**
   * 아이콘 활성화 유무.
   */
  isActive: boolean;
  /**
   * 읽기전용 여부.
   */
  readOnly: boolean;
  /**
   * 비활성화 유무.
   */
  disabled: boolean;
  /**
   * 아이콘 Rating 인덱스.
   */
  itemValue: number;
  /**
   * 활성 Rating 값, 동작에 따라 `selected` | `hover` | `focus` 값을 할당.
   */
  activeRatingValue: number | null;
  /**
   * 선택된 Rating 값.
   */
  selectedRatingValue: number | null;
  /**
   * 선택한 아이콘만 강조 여부.
   */
  highlightSelectedOnly: boolean;
  /**
   * hover 값.
   */
  hover: number;
  /**
   * focus 값.
   */
  focus: number;
  /**
   * 라벨 속성값.
   */
  labelProps?: {
    style?: React.CSSProperties;
  };
  /**
   * 비어있을 때 표시되는 아이콘.
   */
  emptyIcon: React.ReactNode;
  /**
   * 채워졌을 때 표시되는 아이콘.
   */
  filledIcon: React.ReactNode;
  /**
   * 아이콘을 포함하는 컴포넌트.
   */
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  /**
   * 값이 변경되면 호출할 콜백함수.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 아이콘 `click` 이벤트 발생시 호출할 콜백함수.
   */
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * 아이콘 `focus` 이벤트 발생시 호출할 콜백함수.
   */
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * 아이콘 `blur` 이벤트 발생시 호출할 콜백함수.
   */
  onBlur: () => void;
}

export const RatingItem = (props: RatingItemProps) => {
  const {
    classes,
    name,
    isActive,
    readOnly,
    disabled,
    itemValue,
    activeRatingValue,
    selectedRatingValue,
    highlightSelectedOnly,
    hover,
    focus,
    labelProps,
    emptyIcon,
    filledIcon,
    IconContainerComponent: IconContainerComponentProp,
    onChange,
    onClick,
    onFocus,
    onBlur,
  } = props;

  const id = useId();
  const isFilled =
    activeRatingValue !== null &&
    (highlightSelectedOnly
      ? itemValue === activeRatingValue
      : itemValue <= activeRatingValue);
  const isHovered = itemValue <= hover;
  const isFocused = itemValue <= focus;
  const isChecked = itemValue === selectedRatingValue;

  const IconContainerComponent = IconContainerComponentProp
    ? (iconProps: Omit<IconContainerProps, 'value'>) => (
        <IconContainerComponentProp value={itemValue} {...iconProps} />
      )
    : undefined;
  const RatingIconComponent = IconContainerComponent ?? 'span';

  const RatingIconRender = (
    <RatingIconComponent
      className={classNames(classes.icon, {
        [classes.iconEmpty]: !isFilled,
        [classes.iconFilled]: isFilled,
        [classes.iconHover]: isHovered,
        [classes.iconFocus]: isFocused,
        [classes.iconActive]: isActive,
      })}
    >
      {emptyIcon && !isFilled ? emptyIcon : filledIcon}
    </RatingIconComponent>
  );

  if (readOnly) {
    return <span {...labelProps}>{RatingIconRender}</span>;
  }

  return (
    <>
      <label htmlFor={id} className={classes.label} {...labelProps}>
        {RatingIconRender}
      </label>
      <input
        type="radio"
        className={classes.visuallyHiddenInput}
        id={id}
        name={name}
        value={itemValue}
        disabled={disabled}
        checked={isChecked}
        onChange={disabled ? undefined : onChange}
        onClick={disabled ? undefined : onClick}
        onFocus={disabled ? undefined : onFocus}
        onBlur={disabled ? undefined : onBlur}
      />
    </>
  );
};
