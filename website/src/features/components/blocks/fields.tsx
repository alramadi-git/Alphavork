"use client";

import { UndefinableType } from "@/common/types/undefinable.type";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { defaultCountries, FlagImage } from "react-international-phone";

import {
  ReactNode,
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";

import {
  IconMail,
  IconLock,
  IconEyeOff,
  IconEye,
  IconChevronDown,
  IconCheck,
  IconPhone,
} from "@tabler/icons-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { Input } from "@/features/components/ui/input";

import { Button } from "../ui/button";

type tFieldInputRef = {
  focus: () => void;
  blur: () => void;
  setValue: (value: string) => void;
  reset: (defaultValue?: string) => void;
};

type tFieldInputProps = {
  icon?: ReactNode;
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  type?: "text" | "search" | "tel" | "email" | "password";
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onFocus?: () => void;
  onKeyDown?: (key: string) => void;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
};

const FieldInput = forwardRef<tFieldInputRef, tFieldInputProps>(
  (
    {
      icon,
      id,
      isInvalid,
      isDisabled,
      isRequired,
      type = "text",
      className,
      placeholder,
      defaultValue = "",
      onFocus: onFocusProp,
      onKeyDown: onKeyDownProp,
      onValueChange: onValueChangeProp,
      onBlur: onBlurProp,
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(defaultValue);

    const inputRef = useRef<HTMLInputElement>(null);

    function imperativeFocus() {
      inputRef.current?.focus();
    }

    function imperativeBlur() {
      inputRef.current?.blur();
    }

    function imperativeSetValue(value: string) {
      setValue(value);
    }

    function imperativeRest(defaultValue: string = "") {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      focus: imperativeFocus,
      blur: imperativeBlur,
      setValue: imperativeSetValue,
      reset: imperativeRest,
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
          ref={inputRef}
          id={id}
          aria-invalid={isInvalid}
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
          onFocus={onFocus}
          onKeyDown={({ key }) => onKeyDown(key)}
          onChange={({ currentTarget: { value } }) => onValueChange(value)}
          onBlur={onBlur}
        />
      </div>
    );
  },
);

FieldInput.displayName = "FieldInput";

type tCountry = {
  iso: string;
  "country-code": string;
};

type tFieldPhoneNumberRef = {
  reset: (defaultValue?: string) => void;
};
type tFieldPhoneNumberProps = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const FieldPhoneNumber = forwardRef<
  tFieldPhoneNumberRef,
  tFieldPhoneNumberProps
>(
  (
    {
      id,
      isInvalid,
      isDisabled,
      isRequired,
      defaultValue = "",
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const tFieldPhoneNumber = useTranslations("components.fields.phone-number");

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [country, setCountry] = useState<tCountry>(
      tFieldPhoneNumber.raw("country.default-country-value"),
    );

    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const inputRef = useRef<tFieldInputRef>(null);

    useEffect(() => {
      const parsedPhoneNumber = parsePhoneNumberFromString(defaultValue);
      if (!parsedPhoneNumber) {
        setPhoneNumber(defaultValue);

        return;
      }

      setCountry({
        iso: parsedPhoneNumber.country!.toLocaleLowerCase(),
        "country-code": parsedPhoneNumber.countryCallingCode,
      });
      setPhoneNumber(parsedPhoneNumber.nationalNumber);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function imperativeReset(defaultValue: string = ""): void {
      if (!isValidPhoneNumber(defaultValue)) {
        setCountry(tFieldPhoneNumber.raw("country.default-country-value"));
        setPhoneNumber("");

        inputRef.current?.reset("");

        return;
      }

      const parsedPhoneNumber = parsePhoneNumberFromString(defaultValue)!;

      setCountry({
        iso: parsedPhoneNumber.country!,
        "country-code": parsedPhoneNumber.countryCallingCode,
      });
      setPhoneNumber(parsedPhoneNumber.nationalNumber);

      inputRef.current?.reset(parsedPhoneNumber.nationalNumber);
    }

    useImperativeHandle(ref, () => ({
      reset: imperativeReset,
    }));

    function onCountrySelect(country: tCountry): void {
      setCountry(country);

      setIsOpen(false);

      inputRef.current?.focus();
    }

    function onPhoneNumberKeyDown(key: string) {
      if (key !== "Enter") {
        return;
      }

      inputRef.current?.blur();
    }

    function onPhoneNumberValueChange(value: string) {
      setPhoneNumber(value);
    }

    function onPhoneNumberBlur() {
      if (!isValidPhoneNumber(`+${country["country-code"]}${phoneNumber}`)) {
        setPhoneNumber("");
        inputRef.current?.setValue("");

        onValueChangeProp?.("");

        return;
      }

      const parsedPhoneNumber = parsePhoneNumberFromString(
        `+${country["country-code"]}${phoneNumber}`,
      )!;

      setPhoneNumber(parsedPhoneNumber.nationalNumber);
      onValueChangeProp?.(parsedPhoneNumber.number);

      inputRef.current?.setValue(parsedPhoneNumber.nationalNumber);
    }

    return (
      <div aria-disabled={isDisabled} className="flex items-center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-input rounded-e-none border-r-0 px-3 shadow-none outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
              <FlagImage iso2={country.iso} className="size-6" />
              <p className="text-muted-foreground">
                +{country["country-code"]}
              </p>
              <IconChevronDown className="text-muted-foreground/80" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="border-input w-full p-0">
            <Command>
              <CommandInput
                placeholder={tFieldPhoneNumber("country.placeholder")}
              />
              <CommandList>
                <CommandEmpty>
                  {tFieldPhoneNumber("country.no-match")}
                </CommandEmpty>
                {defaultCountries.map((defaultCountry) => (
                  <CommandItem
                    key={defaultCountry[1]}
                    value={`${defaultCountry[0]}-${defaultCountry[1]}-${defaultCountry[2]}`}
                    onSelect={() => {
                      onCountrySelect({
                        iso: defaultCountry[1],
                        "country-code": defaultCountry[2],
                      });
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FlagImage iso2={defaultCountry[1]} className="size-6" />
                      {defaultCountry[0]}
                      <span className="text-muted-foreground">
                        +{defaultCountry[2]}
                      </span>
                    </div>

                    {country.iso === defaultCountry[1] && (
                      <IconCheck className="ml-auto size-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="grow">
          <FieldInput
            icon={<IconPhone className="size-4" />}
            ref={inputRef}
            id={id}
            isInvalid={isInvalid}
            isRequired={isRequired}
            type="tel"
            placeholder={tFieldPhoneNumber("placeholder")}
            className="rounded-s-none"
            defaultValue={phoneNumber}
            onKeyDown={onPhoneNumberKeyDown}
            onValueChange={onPhoneNumberValueChange}
            onBlur={onPhoneNumberBlur}
          />
        </div>
      </div>
    );
  },
);

FieldPhoneNumber.displayName = "FieldPhoneNumber";

type tFieldEmailRef = {
  setValue: (value: string) => void;
  reset: (defaultValue?: string) => void;
};

type tFieldEmailProps = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const FieldEmail = forwardRef<tFieldEmailRef, tFieldEmailProps>(
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
    const inputRef = useRef<tFieldInputRef>(null);

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
      <FieldInput
        ref={inputRef}
        id={id}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isRequired={isRequired}
        type="email"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        icon={<IconMail className="size-4" />}
      />
    );
  },
);

FieldEmail.displayName = "FieldEmail";

type tFieldPasswordRef = {
  setValue: (value: string) => void;
  reset: (defaultValue?: string) => void;
};

type tFieldPasswordProps = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const FieldPassword = forwardRef<tFieldPasswordRef, tFieldPasswordProps>(
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
    const inputRef = useRef<tFieldInputRef>(null);

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

    function onToggleVisibility() {
      setIsVisible((prevState) => !prevState);
    }

    function onValueChange(value: string) {
      onValueChangeProp?.(value);
    }

    return (
      <div aria-disabled={isDisabled} className="relative">
        <FieldInput
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
          onClick={onToggleVisibility}
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

FieldPassword.displayName = "FieldPassword";

type tFieldNumberRef = {
  setValue: (value?: number) => void;
  reset: (defaultValue?: number) => void;
};

type tFieldNumberProps = {
  icon?: ReactNode;
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: number;
  formatter?: (value?: number) => string;
  onValueChange?: (value?: number) => void;
};

const FieldNumber = forwardRef<tFieldNumberRef, tFieldNumberProps>(
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
    const [value, setValue] = useState<UndefinableType<number>>(defaultValue);
    const [formattedValue, setFormattedValue] = useState<string>(
      formatter(defaultValue),
    );

    const inputRef = useRef<tFieldInputRef>(null);

    function imperativeSetValue(value?: number) {
      const formattedValue = formatter(value);

      setValue(value);
      setFormattedValue(formattedValue);

      inputRef.current?.setValue(formattedValue);
    }

    function imperativeReset(defaultValue?: number) {
      const formattedValue = formatter(defaultValue);

      setValue(defaultValue);
      setFormattedValue(formattedValue);

      inputRef.current?.setValue(formattedValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function onFocus() {
      inputRef.current?.setValue(value?.toString() ?? "");
    }

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
      setFormattedValue(formatter(parsedValue));

      onValueChangeProp?.(parsedValue);
    }

    function onBlur() {
      inputRef.current?.setValue(formattedValue);
    }

    return (
      <FieldInput
        ref={inputRef}
        icon={icon}
        id={id}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isRequired={isRequired}
        placeholder={placeholder}
        defaultValue={formattedValue}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onValueChange={onValueChange}
        onBlur={onBlur}
      />
    );
  },
);

FieldNumber.displayName = "FieldNumber";

// type tMinMax = {
//   min?: number;
//   max?: number;
// };

// type tFieldNumberMinMaxRef = {
//   setValue: (value?: tMinMax) => void;
//   reset: (defaultValue?: tMinMax) => void;
// };

// type tFieldNumberMinMaxProps = {
//   id?: string;
//   isInvalid?: boolean;
//   minPlaceholder?: string;
//   min?: number;
//   maxPlaceholder?: string;
//   max?: number;
//   onMinChange?: (value?: number) => void;
//   onMaxChange?: (value?: number) => void;
//   formatter?: (value?: number) => string;
// };

// const FieldNumberMinMax = forwardRef<
//   tFieldNumberMinMaxRef,
//   tFieldNumberMinMaxProps
// >(
//   (
//     {
//       id,
//       isInvalid,
//       minPlaceholder,
//       min: minProp,
//       maxPlaceholder,
//       max: maxProp,
//       onMaxChange: _onMaxChange,
//       onMinChange: _onMinChange,
//       formatter,
//     },
//     ref,
//   ) => {
//     const [min, setMin] = useState<number>(minProp ?? 0);
//     const [minValue, setMinValue] = useState<string>(
//       formatter?.(minProp) ?? minProp?.toString() ?? "",
//     );

//     const [max, setMax] = useState<number>(maxProp ?? 0);
//     const [maxValue, setMaxValue] = useState<string>(
//       formatter?.(maxProp) ?? maxProp?.toString() ?? "",
//     );

//     function imperativeChange(value?: tMinMax) {
//       const min = value?.min;
//       const max = value?.max;

//       setMin(min ?? 0);
//       setMinValue(formatter?.(min) ?? min?.toString() ?? "");

//       setMax(max ?? 0);
//       setMaxValue(formatter?.(max) ?? max?.toString() ?? "");
//     }

//     function imperativeReset(defaultValue?: tMinMax) {
//       const min = defaultValue?.min;
//       const max = defaultValue?.max;

//       setMin(min ?? 0);
//       setMinValue(formatter?.(min) ?? min?.toString() ?? "");

//       setMax(max ?? 0);
//       setMaxValue(formatter?.(max) ?? max?.toString() ?? "");
//     }

//     useImperativeHandle(ref, () => ({
//       setValue: imperativeChange,
//       reset: imperativeReset,
//     }));

//     function onFocus(field: "min" | "max") {
//       if (field === "min") setMinValue(minValue === "" ? "" : min.toString());
//       else setMaxValue(maxValue === "" ? "" : max.toString());
//     }

//     function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
//       if (event.key === "Enter") event.currentTarget.blur();
//     }

//     function onBlur(field: "min" | "max", value: string) {
//       const parsedValue = value === "" ? undefined : Number(value);
//       if (field === "min") onMinBlur(parsedValue);
//       else onMaxBlur(parsedValue);
//     }

//     function onMinBlur(value?: number) {
//       if (Number.isNaN(value)) {
//         setMin(0);
//         setMinValue("");
//         _onMinChange?.(undefined);

//         return;
//       }

//       setMin(value ?? 0);
//       setMinValue(formatter?.(value) ?? value?.toString() ?? "");
//       _onMinChange?.(value);
//     }

//     function onMaxBlur(value?: number) {
//       if (Number.isNaN(value)) {
//         setMax(0);
//         setMaxValue("");
//         _onMaxChange?.(undefined);

//         return;
//       }

//       setMax(value ?? 0);
//       setMaxValue(formatter?.(value) ?? value?.toString() ?? "");
//       _onMaxChange?.(value);
//     }

//     function changeValue(field: "min" | "max", value: string) {
//       if (field === "min") setMinValue(value);
//       else setMaxValue(value);
//     }

//     return (
//       <div className="flex">
//         <Input
//           id={id}
//           aria-invalid={isInvalid}
//           type="text"
//           placeholder={minPlaceholder}
//           className="rounded-e-none"
//           value={minValue}
//           onFocus={() => onFocus("min")}
//           onKeyDown={onKeyDown}
//           onChange={(event) => changeValue("min", event.currentTarget.value)}
//           onBlur={(event) => onBlur("min", event.currentTarget.value)}
//         />
//         <Input
//           aria-invalid={isInvalid}
//           type="text"
//           placeholder={maxPlaceholder}
//           className="rounded-s-none aria-invalid:border-s-transparent"
//           value={maxValue}
//           onFocus={() => onFocus("max")}
//           onKeyDown={onKeyDown}
//           onChange={(event) => changeValue("max", event.currentTarget.value)}
//           onBlur={(event) => onBlur("max", event.currentTarget.value)}
//         />
//       </div>
//     );
//   },
// );

// FieldNumberMinMax.displayName = "FieldNumberMinMax";

export type {
  tFieldInputRef,
  tFieldPhoneNumberRef,
  tFieldEmailRef,
  tFieldPasswordRef,
  tFieldNumberRef,
};

export { FieldInput, FieldPhoneNumber, FieldEmail, FieldPassword, FieldNumber };
