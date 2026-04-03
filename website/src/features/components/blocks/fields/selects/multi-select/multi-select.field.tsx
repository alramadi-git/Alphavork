"use client";

import {
  ReactElement,
  useState,
  Fragment,
  Ref,
  forwardRef,
  useImperativeHandle,
} from "react";

import { useTranslations } from "next-intl";

import { IconX, IconCheck, IconChevronsDown } from "@tabler/icons-react";

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
} from "@/features/components/ui/command";

import { Badge } from "@/features/components/ui/badge";

import { Button } from "@/features/components/ui/button";

import { GroupType } from "../types/group.type";
import { OptionType } from "../types/option.type";

import { MultiSelectRef } from "./multi-select.ref";
import { MultiSelectProps } from "./multi-select.props";

export const MultiSelectField = forwardRef(
  <TGroup extends GroupType<TOption>, TOption extends OptionType>(
    {
      id,
      isInvalid,
      isDisabled,
      maxShownOptions = 3,
      placeholder,
      defaultValues,
      groups,
      render = (option) => <span>{option.label}</span>,
      renderOption = (option, isSelected) => (
        <Button variant="ghost" className="font-normal">
          {option.label}
          {isSelected && <IconCheck className="size-4" />}
        </Button>
      ),
      onToggle,
    }: MultiSelectProps<TGroup, TOption>,
    ref: Ref<MultiSelectRef<TOption>>,
  ): ReactElement<typeof Popover> => {
    const tMultiSelect = useTranslations(
      "components.fields.selects.multi-select",
    );

    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [values, setValues] = useState<TOption[]>(defaultValues ?? []);

    const visibleValues: TOption[] = isExpanded
      ? values
      : values.slice(0, maxShownOptions);

    const hiddenCount = values.length - visibleValues.length;

    function imperativeSetValue(values: TOption[]) {
      setValues(values);
    }

    function imperativeReset(defaultValues: TOption[] = []) {
      setValues(defaultValues);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function toggle(option: TOption, isSelected: boolean) {
      if (isDisabled) {
        return;
      }

      if (isSelected) {
        const options = values.filter((value) => value !== option);

        setValues(options);
        onToggle?.(options);

        return;
      }

      const options = [...values, option];

      setValues(options);
      onToggle?.(options);
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={isInvalid}
            aria-disabled={isDisabled}
            aria-expanded={isOpen}
            id={id}
            variant="outline"
            className="w-full justify-between hover:bg-transparent"
          >
            <div className="flex flex-wrap items-center gap-1">
              {values.length > 0 ? (
                <Fragment>
                  {visibleValues.flatMap((value) => (
                    <Badge key={value.value} variant="outline">
                      {value.label}
                      <span
                        className="hover:bg-foreground/10 inline-flex size-4 items-center justify-center rounded duration-100"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggle(value, true);
                        }}
                      >
                        <IconX className="size-3" />
                      </span>
                    </Badge>
                  ))}
                  {(visibleValues.length > maxShownOptions ||
                    hiddenCount > 0) && (
                    <Badge
                      variant="outline"
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsExpanded((prev) => !prev);
                      }}
                    >
                      {isExpanded
                        ? tMultiSelect("show-less")
                        : tMultiSelect("show-more", {
                            count: hiddenCount,
                          })}
                    </Badge>
                  )}
                </Fragment>
              ) : (
                <span
                  aria-invalid={isInvalid}
                  className="text-muted-foreground aria-invalid:text-destructive/80 line-clamp-1 text-start text-sm text-wrap"
                >
                  {placeholder}
                </span>
              )}
            </div>
            <IconChevronsDown
              aria-invalid={isInvalid}
              className="text-muted-foreground/80 aria-invalid:text-destructive/60 shrink-0"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
          <Command>
            <CommandList>
              {groups.map((group) => (
                <CommandGroup key={group.value} heading={render(group)}>
                  {group.options.map((option) => {
                    const isSelected = values.some(
                      (value) => value.value === option.value,
                    );
                    return (
                      <CommandItem
                        asChild
                        key={option.value}
                        value={option.value}
                        className="w-full cursor-pointer justify-between gap-2.5"
                        onSelect={() => toggle(option, isSelected)}
                      >
                        {renderOption(option, isSelected)}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
) as <TGroup extends GroupType<TOption>, TOption extends OptionType>(
  props: MultiSelectProps<TGroup, TOption> & {
    ref?: Ref<MultiSelectRef<TOption>>;
  },
) => ReactElement<typeof Popover>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
MultiSelectField.displayName = "FieldMultiSelect";
