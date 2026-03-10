import { UndefinableType } from "@/types/nullish-type";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { localeEnum } from "@/features/i18n/enums/locale";
import { useLocale } from "next-intl";

import { DateFormatterLibrary } from "@/features/formatters/libraries/date-formatter-library";

import { IconCalendar } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { FieldInput, tFieldInputRef } from "./fields";

import { Button } from "../ui/button";

type tFieldDatePickerRef = {
  reset: (defaultDate?: Date) => void;
};

type tFieldDatePickerProps = {
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  id?: string;
  placeholder?: string;
  defaultValue?: Date;
  onValueChange?: (value?: Date) => void;
};

const FieldDatePicker = forwardRef<tFieldDatePickerRef, tFieldDatePickerProps>(
  (
    {
      isInvalid,
      isDisabled,
      isRequired,
      id,
      placeholder,
      defaultValue,
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const locale = useLocale() as localeEnum;
    const clsDateFormatter = new DateFormatterLibrary(locale);

    const [date, setDate] = useState<UndefinableType<Date>>(defaultValue);
    const [month, setMonth] = useState<UndefinableType<Date>>(date);

    const [value, setValue] = useState<string>(
      date === undefined ? "" : clsDateFormatter.format(date),
    );

    const inputRef = useRef<tFieldInputRef>(null);

    function imperativeReset(defaultDate?: Date) {
      setDate(defaultDate);
      setMonth(defaultDate);

      onValueChangeProp?.(defaultDate);

      if (defaultDate === undefined) {
        setValue("");
        inputRef.current?.setValue("");

        return;
      }

      const formattedDate = clsDateFormatter.format(defaultDate);

      setValue(formattedDate);
      inputRef.current?.setValue(formattedDate);
    }

    useImperativeHandle(ref, () => ({
      reset: imperativeReset,
    }));

    function onCalendarSelect(date?: Date) {
      setDate(date);
      setMonth(date);

      onValueChangeProp?.(date);

      if (date === undefined) {
        setValue("");
        inputRef.current?.setValue("");

        return;
      }

      const formattedDate = clsDateFormatter.format(date);

      setValue(formattedDate);
      inputRef.current?.setValue(formattedDate);
    }

    function onInputKeyDown(key: string) {
      if (key === "Enter") {
        inputRef.current?.blur();
      }
    }

    function onInputValueChange(value: string) {
      setValue(value);
    }

    function onInputBlur() {
      const date = new Date(value);
      if (date === undefined || isNaN(date.getTime())) {
        setMonth(undefined);
        setDate(undefined);

        setValue("");
        inputRef.current?.setValue("");

        onValueChangeProp?.(undefined);

        return;
      }

      const formattedDate = clsDateFormatter.format(date);

      setMonth(date);
      setDate(date);

      setValue(formattedDate);
      inputRef.current?.setValue(formattedDate);

      onValueChangeProp?.(date);
    }

    return (
      <div className="relative">
        <FieldInput
          ref={inputRef}
          id={id}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          isRequired={isRequired}
          placeholder={placeholder}
          className="pe-9"
          defaultValue={value}
          onKeyDown={onInputKeyDown}
          onValueChange={onInputValueChange}
          onBlur={onInputBlur}
        />
        <Popover onOpenChange={(open) => open && setMonth(date)}>
          <PopoverTrigger asChild>
            <Button
              aria-invalid={isInvalid}
              variant="ghost"
              type="button"
              className="text-muted-foreground/80 absolute top-1/2 right-1.5 size-6 -translate-y-1/2"
            >
              <IconCalendar className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={10} align="end" className="w-auto p-0">
            <Calendar
              mode="single"
              month={month}
              selected={date}
              onMonthChange={setMonth}
              onSelect={onCalendarSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

FieldDatePicker.displayName = "FieldDatePicker";

export type { tFieldDatePickerRef };

export { FieldDatePicker };
