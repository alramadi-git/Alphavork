"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";

import { IconMail } from "@tabler/icons-react";

import { EmailRef } from "./email.ref";
import { EmailProps } from "./email.props";

import { InputRef } from "../input/input.ref";
import { InputField } from "../input/input.field";

export const EmailField = forwardRef<EmailRef, EmailProps>(
  (
    {
      id,
      isInvalid,
      isDisabled,
      isRequired,
      placeholder,
      defaultValue,
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const inputRef = useRef<InputRef>(null);

    function imperativeSetValue(value: string) {
      inputRef.current?.setValue(value);
    }
    function imperativeRest(defaultValue: string = "") {
      inputRef.current?.setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeRest,
    }));

    function onValueChange(value: string) {
      onValueChangeProp?.(value);
    }

    return (
      <InputField
        icon={<IconMail className="size-4" />}
        id={id}
        ref={inputRef}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isRequired={isRequired}
        type="email"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      />
    );
  },
);

EmailField.displayName = "EmailField";
