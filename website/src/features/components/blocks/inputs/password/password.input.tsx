"use client";

import { useState, forwardRef, useRef, useImperativeHandle } from "react";

import { IconLock, IconEyeOff, IconEye } from "@tabler/icons-react";

import { PasswordRef } from "./password.ref";
import { PasswordProps } from "./password.props";

import { InputRef } from "../input/input.ref";
import { Input } from "../input/input";
import { Button } from "@/features/components/ui/button";

export const PasswordInput = forwardRef<PasswordRef, PasswordProps>(
  (
    {
      id,
      isInvalid,
      isDisabled,
      isRequired,
      placeholder,
      defaultValue = "",
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const inputRef = useRef<InputRef>(null);

    const [isVisible, setIsVisible] = useState<boolean>(false);

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

    function onVisibilityToggle() {
      setIsVisible((prevState) => !prevState);
    }

    function onValueChange(value: string) {
      onValueChangeProp?.(value);
    }

    return (
      <div aria-disabled={isDisabled} className="relative">
        <Input
          ref={inputRef}
          id={id}
          isInvalid={isInvalid}
          isRequired={isRequired}
          type={isVisible ? "text" : "password"}
          className="pe-9"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          icon={<IconLock className="size-4" />}
        />

        <Button
          aria-invalid={isInvalid}
          variant="ghost"
          type="button"
          className="text-muted-foreground/80 absolute top-1/2 right-1.5 size-6 -translate-y-1/2"
          onClick={() => onVisibilityToggle()}
        >
          {isVisible ? (
            <IconEyeOff className="size-4" />
          ) : (
            <IconEye className="size-4" />
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
