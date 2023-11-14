import { TextareaProps } from "@components";
import classNames from "classnames";
import { forwardRef, useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface TitleCounterProps extends TextareaProps {
  label?: string;
  isLight?: boolean;
  textLength?: number;
  direction?: "top" | "bottom" | "right";
}
export const TextAreaWithTitleCounter = forwardRef<
  HTMLTextAreaElement,
  TitleCounterProps
>((args, ref) => {
  const {
    style,
    label,
    isLight,
    textLength,
    showCount,
    required,
    readOnly,
    isError,
    direction,
    ...inputProps
  } = args;
  const [count, setCount] = useState<number>();

  const resultClassName = classNames("textarea-border", args.className, {
    invalid: isError,
  });

  const handleTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value?.length);
      return args.onChange?.(e);
    },
    [args]
  );

  return (
    <>
      <div className="textareaWrapper">
        <p className={classNames("textareaLabel", { light: isLight })}>
          {label}
          {required && <span className="required"> *</span>}
        </p>
        {showCount && direction === "top" ? (
          <span className={classNames(`text-counter-${direction}`)}>
            {count || 0}
            {`/${args.maxLength}`}
          </span>
        ) : null}
      </div>

      <TextareaAutosize
        {...inputProps}
        className={resultClassName}
        onChange={handleTextArea}
        placeholder={args.placeholder}
        maxLength={args.maxLength}
        ref={ref}
        readOnly={readOnly}
        autoComplete={args.autoComplete ? "true" : "false"}
      />
      {showCount && direction === "bottom" ? (
        <span className={classNames(`text-counter-${direction}`)}>
          {count || 0}
          {`/${args.maxLength}`}
        </span>
      ) : null}
    </>
  );
});
