"use client";

import { cn } from "@/features/components/ui/utils/utils";

import { useState, forwardRef, useRef, useImperativeHandle } from "react";

import { InputRef } from "./input.ref";
import { InputProps } from "./input.props";

import { Input } from "@/features/components/ui/input";

export const InputField = forwardRef<InputRef, InputProps>(
  (
    {
      icon,
      id,
      isInvalid,
      isDisabled,
      isRequired,
      type,
      className,
      placeholder,
      defaultValue,
      onKeyDown: onKeyDownProp,
      onValueChange: onValueChangeProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(defaultValue ?? "");

    const inputRef = useRef<HTMLInputElement>(null);

    function imperativeSetValue(value: string) {
      setValue(value);
    }

    function imperativeRest(defaultValue: string = "") {
      setValue(defaultValue);
    }

    function imperativeFocus() {
      inputRef.current?.focus();
    }

    function imperativeBlur() {
      inputRef.current?.blur();
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeRest,
      focus: imperativeFocus,
      blur: imperativeBlur,
    }));

    function onFocus() {
      onFocusProp?.();
    }

    function onKeyDown(key: string) {
      onKeyDownProp?.(key);
    }

    function onValueChange(value: string) {
      setValue(value);
      onValueChangeProp?.(value);
    }

    function onBlur() {
      onBlurProp?.();
    }

    return (
      <div aria-disabled={isDisabled} className="relative">
        {icon != undefined && icon !== null && (
          <span
            aria-invalid={isInvalid}
            className="text-muted-foreground/80 aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 placeholder:truncate"
          >
            {icon}
          </span>
        )}
        <Input
          aria-invalid={isInvalid}
          id={id}
          ref={inputRef}
          required={isRequired}
          type={type}
          className={cn(
            "aria-invalid:placeholder:text-destructive/80",
            {
              "ps-9": icon != undefined && icon !== null,
            },
            className,
          )}
          placeholder={placeholder}
          value={value}
          onKeyDown={({ key }) => onKeyDown(key)}
          onChange={({ currentTarget: { value } }) => onValueChange(value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    );
  },
);

InputField.displayName = "InputField";
