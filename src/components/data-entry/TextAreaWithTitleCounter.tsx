import { TextareaProps } from "@components";
import classNames from "classnames";
import { forwardRef, useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export interface TitleCounterProps extends TextareaProps {
  label?: string;
  isLight?: boolean;
  textLength?: number;
  direction?: "top" | "bottom" | "inside";
  isError?: boolean;
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

  const resultClassName = classNames(args.className, {
    invalid: isError,
    "textarea-border": direction !== "inside",
    "textarea-middle": direction === "inside",
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
      {direction !== "bottom" ? (
        <div className="textarea-title-counter-wrapper">
          <span className={classNames("textarea-label", { light: isLight })}>
            {label}
            {required && <span className="required"> *</span>}
          </span>
          {showCount && direction === "top" ? (
            <span className={classNames(`textarea-counter ${direction}`)}>
              {count || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className={classNames(`textarea-counter-wrapper`, direction)}>
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
        {showCount && direction === "inside" ? (
          <span className={`textarea-counter ${direction}`}>
            {count || 0}
            {`/${args.maxLength}`}
          </span>
        ) : null}
      </div>
      {direction === "bottom" ? (
        <div className="textarea-title-counter-wrapper">
          <span className={classNames("textarea-label", { light: isLight })}>
            {label}
            {required && <span className="required"> *</span>}
          </span>
          {showCount && direction === "bottom" ? (
            <span className={classNames(`textarea-counter ${direction}`)}>
              {count || 0}
              {`/${args.maxLength}`}
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );
});
