"use client";

import { useState, forwardRef, useRef, useImperativeHandle } from "react";

import { UndefinableType } from "@/common/types/undefinable.type";

import { NumberRef } from "./number.ref";
import { NumberProps } from "./number.props";

import { InputRef } from "../../inputs/input/input.ref";
import { InputField } from "../../inputs/input/input.field";

export const NumberField = forwardRef<NumberRef, NumberProps>(
  (
    {
      icon,
      id,
      isInvalid,
      isDisabled,
      isRequired,
      placeholder,
      defaultValue,
      onValueChange: onValueChangeProp,
      formatter = (value) => value?.toString() ?? "",
    },
    ref,
  ) => {
    const inputRef = useRef<InputRef>(null);

    const [value, setValue] = useState<UndefinableType<number>>(defaultValue);

    function imperativeSetValue(value?: number) {
      setValue(value);

      inputRef.current?.setValue(formatter(value));
    }

    function imperativeReset(defaultValue?: number) {
      setValue(defaultValue);

      inputRef.current?.setValue(formatter(defaultValue));
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function onKeyDown(key: string) {
      if (key === "Enter") {
        inputRef.current?.blur();
      }
    }

    function onValueChange(value: string) {
      let parsedValue = value === "" ? undefined : Number(value);
      if (parsedValue !== undefined && Number.isNaN(parsedValue)) {
        parsedValue = undefined;
      }

      setValue(parsedValue);

      onValueChangeProp?.(parsedValue);
    }

    function onFocus() {
      inputRef.current?.setValue(value?.toString() ?? "");
    }

    function onBlur() {
      inputRef.current?.setValue(formatter(value));
    }

    return (
      <InputField
        icon={icon}
        id={id}
        ref={inputRef}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isRequired={isRequired}
        placeholder={placeholder}
        defaultValue={formatter(defaultValue)}
        onKeyDown={onKeyDown}
        onValueChange={onValueChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  },
);

NumberField.displayName = "NumberField";
