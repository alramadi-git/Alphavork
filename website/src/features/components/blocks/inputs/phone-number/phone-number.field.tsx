"use client";

import { useState, forwardRef, useRef, useImperativeHandle } from "react";

import { useTranslations } from "next-intl";

import { UndefinableType } from "@/common/types/undefinable.type";

import { PhoneNumberRef } from "./phone-number.ref";
import { PhoneNumberProps } from "./phone-number.props";

import { InputRef } from "../input/input.ref";
import { Input } from "../input/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/components/ui/popover";
import { Button } from "@/features/components/ui/button";
import { FlagImage } from "react-international-phone";
import { IconChevronDown } from "@tabler/icons-react";
import { Command, CommandInput } from "@/features/components/ui/command";

export const PhoneNumberField = forwardRef<PhoneNumberRef, PhoneNumberProps>(
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
    const tPhoneNumberField = useTranslations(
      "components.fields.inputs.phone-number",
    );

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [country, setCountry] = useState<tCountry>(
      tPhoneNumberField.raw("country.default-country-value"),
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
        setCountry(tPhoneNumberField.raw("country.default-country-value"));
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
                placeholder={tPhoneNumberField("country.placeholder")}
              />
              <CommandList>
                <CommandEmpty>
                  {tPhoneNumberField("country.no-match")}
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
            placeholder={tPhoneNumberField("placeholder")}
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

PhoneNumberField.displayName = "PhoneNumberField";
