import { Textarea, TextareaProps } from "@components";
import { useCount } from "@hooks";
import { CountConfig } from "@models";
import classNames from "classnames";
import { forwardRef, useState } from "react";

interface TitleCounterProps extends CountConfig, TextareaProps {
  label?: string;
  isLight?: boolean;
  textLength?: number;
  count?: CountConfig;
  direction?: "top" | "bottom" | "right";
}
export const TextAreaWithTitleCounter = forwardRef<
  HTMLTextAreaElement,
  TitleCounterProps
>((args, ref) => {
  const {
    label,
    isLight,
    textLength,
    showCount,
    required,
    readOnly,
    isError,
    count,
    direction,
    ...inputProps
  } = args;

  const [value, setValue] = useState();
  const formatValue =
    value === undefined || value === null ? "" : String(value);
  const countConfig = useCount(count, showCount);
  const mergedMax = countConfig.max || args.maxLength;
  const valueLength = countConfig.strategy(formatValue);

  const getCount = () => {
    // Max length value
    const hasMaxLength = Number(mergedMax) > 0;

    if (showCount || countConfig.show) {
      const dataCount = countConfig.showFormatter
        ? countConfig.showFormatter({
            value: formatValue,
            count: valueLength,
            maxLength: mergedMax,
          })
        : `${valueLength}${hasMaxLength ? ` / ${mergedMax}` : ""}`;

      return (
        <>
          {countConfig.show && (
            <span
              className={classNames(`show-count-suffix`, {
                [`${args.className}-show-count-has-suffix`]: !!showCount,
              })}
              style={args.style}
            >
              {dataCount}
            </span>
          )}
          {showCount}
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="textareaWrapper">
        <p className={classNames("textareaLabel", { light: isLight })}>
          {label}
          {required && <span className="required"> *</span>}
        </p>
        {showCount && direction === "top" ? (
          <span className="textCounter">
            {textLength || 0}
            {`/${args.maxLength}`}
          </span>
        ) : null}
      </div>
      <Textarea
        {...inputProps}
        className={classNames({ invalid: isError })}
        required={required}
        ref={ref}
        readOnly={readOnly}
      />
      {showCount && direction === "bottom" ? (
        <span className={classNames(`text-counter-${direction}`)}>
          {textLength || 0}
          {`/${args.maxLength}`}
        </span>
      ) : null}
    </>
  );
});

TextAreaWithTitleCounter.displayName = "text-area-with-title-counter";
