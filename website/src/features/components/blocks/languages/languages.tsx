"use client";

import { useTranslations } from "next-intl";

import { IconSelector } from "@tabler/icons-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/features/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/features/components/ui/command";

import { Button } from "@/features/components/ui/button";
import { LocaleLink } from "@/features/components/blocks/links/locale-link";
import { LanguagesPropsType } from "./types/languages-props.type";
import { CountryType } from "./types/country.type";
import { continents } from "./constants/continents";

export default function Languages({ align = "start" }: LanguagesPropsType) {
  const tLanguages = useTranslations("components.languages");

  const defaultCountry: CountryType = tLanguages.raw("data.default-country");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{defaultCountry.flag}</span>
            <p>{defaultCountry.label}</p>
          </div>
          <IconSelector className="text-muted-foreground/80 size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="p-0">
        <Command>
          <CommandInput placeholder={tLanguages("ui.placeholder")} />
          <CommandList>
            <CommandEmpty>{tLanguages("ui.when-no-match")}</CommandEmpty>
            {continents.map((continent) => (
              <CommandGroup key={continent.label} heading={continent.label}>
                {continent.countries
                  .filter((country) => country.label !== defaultCountry.label)
                  .map((country) => (
                    <CommandItem
                      asChild
                      key={country.label}
                      value={country.label}
                      className="cursor-pointer gap-3"
                    >
                      <LocaleLink locale={country.locale}>
                        <span className="text-lg leading-none">
                          {country.flag}
                        </span>
                        <span dir={country.direction} className="line-clamp-1">
                          {country.label}
                        </span>
                      </LocaleLink>
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
