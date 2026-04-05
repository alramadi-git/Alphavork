"use client";

import { useState, forwardRef, useRef, useImperativeHandle } from "react";

import { UndefinableType } from "@/common/types/undefinable.type";

import { NumberRangeType } from "./types/number-range.type";

import { NumberRangeRef } from "./number-range.ref";
import { NumberRangeProps } from "./number-range.props";

import { NumberRef } from "../number/number.ref";
import { NumberInput } from "../number/number.input";

export const NumberRangeInput = forwardRef<NumberRangeRef, NumberRangeProps>(
  (
    { id, isInvalid, isDisabled, isRequired, minProps, maxProps, formatter },
    ref,
  ) => {
    const minNumberRef = useRef<NumberRef>(null);
    const [, setMinValue] = useState<UndefinableType<number>>(
      minProps?.defaultValue,
    );

    const maxNumberRef = useRef<NumberRef>(null);
    const [, setMaxValue] = useState<UndefinableType<number>>(
      maxProps?.defaultValue,
    );

    function imperativeChange(value?: NumberRangeType) {
      setMinValue(value?.min);
      setMaxValue(value?.max);

      minNumberRef.current?.setValue(value?.min);
      maxNumberRef.current?.setValue(value?.max);
    }

    function imperativeReset(defaultValue?: NumberRangeType) {
      setMinValue(defaultValue?.min);
      setMaxValue(defaultValue?.max);

      minNumberRef.current?.reset(defaultValue?.min);
      maxNumberRef.current?.reset(defaultValue?.max);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeChange,
      reset: imperativeReset,
    }));

    function onValueChange(field: "min" | "max", value?: number) {
      if (field === "min") {
        setMinValue(value);

        minProps?.onValueChange?.(value);
      } else {
        setMaxValue(value);

        maxProps?.onValueChange?.(value);
      }
    }

    return (
      <div className="flex">
        <NumberInput
          id={id}
          ref={minNumberRef}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          isRequired={isRequired}
          placeholder={minProps?.placeholder}
          defaultValue={minProps?.defaultValue}
          onValueChange={(value) => onValueChange("min", value)}
          formatter={formatter}
        />
        <NumberInput
          id={id}
          ref={maxNumberRef}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          isRequired={isRequired}
          placeholder={maxProps?.placeholder}
          defaultValue={maxProps?.defaultValue}
          onValueChange={(value) => onValueChange("max", value)}
          formatter={formatter}
        />
      </div>
    );
  },
);

NumberRangeInput.displayName = "NumberRangeInput";
