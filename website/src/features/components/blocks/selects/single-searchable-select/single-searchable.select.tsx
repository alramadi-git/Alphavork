"use client";

import {
  ReactElement,
  useState,
  Ref,
  forwardRef,
  useImperativeHandle,
} from "react";

import { IconCheck, IconChevronsDown } from "@tabler/icons-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/features/components/ui/popover";

import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from "@/features/components/ui/command";

import { Button } from "@/features/components/ui/button";

import { UndefinableType } from "@/common/types/undefinable.type";

import { OptionType } from "../types/option.type";
import { GroupType } from "../types/group.type";

import { SingleSearchableSelectRef } from "./single-searchable-select.ref";
import { SingleSearchableSelectProps } from "./single-searchable-select.props";

export const SingleSearchableSelect = forwardRef(
  <TGroup extends GroupType<TOption>, TOption extends OptionType>(
    {
      id,
      isInvalid,
      isDisabled,
      placeholder,
      search,
      defaultValue,
      groups,
      render = (option) => <span>{option.label}</span>,
      renderOption = (option, isSelected) => (
        <Button variant="ghost" className="font-normal">
          {option.label}
          {isSelected && <IconCheck className="size-4" />}
        </Button>
      ),
      onSelect: onSelectProp,
    }: SingleSearchableSelectProps<TGroup, TOption>,
    ref: Ref<SingleSearchableSelectRef<TOption>>,
  ): ReactElement<typeof Popover> => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [value, setValue] = useState<UndefinableType<TOption>>(defaultValue);

    function imperativeSetValue(value: UndefinableType<TOption>) {
      setValue(value);
    }

    function imperativeReset(defaultValue?: TOption) {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function onOpenChange(open: boolean) {
      if (isDisabled) {
        return;
      }

      setIsOpen(open);
    }

    function onSelect(option: TOption) {
      console.log(option);
      if (isDisabled) {
        return;
      }

      if (value === undefined) {
        setValue(option);
        onSelectProp?.(option);

        setIsOpen(false);

        return;
      }

      if (option.value === value.value) {
        setValue(undefined);
        onSelectProp?.(undefined);

        setIsOpen(false);

        return;
      }

      setValue(option);
      onSelectProp?.(option);

      setIsOpen(false);
    }

    return (
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={isInvalid}
            aria-disabled={isDisabled}
            id={id}
            variant="outline"
            className="w-full justify-between text-start"
          >
            {value ? (
              render(value)
            ) : (
              <span
                aria-invalid={isInvalid}
                className="text-muted-foreground aria-invalid:text-destructive/80 truncate"
              >
                {placeholder}
              </span>
            )}
            <IconChevronsDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="border-input max-w-(--radix-popper-anchor-width) min-w-(--radix-popper-anchor-width) rounded p-0"
        >
          <Command className="rounded">
            <CommandInput placeholder={search?.placeholder} />
            <CommandList className="flex flex-col p-1">
              <CommandEmpty>{search?.noMatch}</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup
                  key={group.value}
                  value={group.value}
                  heading={group.label}
                >
                  {group.options.map((option) => (
                    <CommandItem
                      asChild
                      key={option.value}
                      value={option.value}
                      className="w-full cursor-pointer justify-between gap-2.5"
                      onSelect={() => onSelect(option)}
                    >
                      {renderOption(option, option.value === value?.value)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
) as <TGroup extends GroupType<TOption>, TOption extends OptionType>(
  props: SingleSearchableSelectProps<TGroup, TOption> & {
    ref?: Ref<SingleSearchableSelectRef<TOption>>;
  },
) => ReactElement<typeof Popover>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
SingleSearchableSelect.displayName = "SingleSearchableSelect";
