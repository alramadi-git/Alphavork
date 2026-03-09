"use client";

import { useTranslations } from "next-intl";

import { IconSelector } from "@tabler/icons-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { LinkLocale } from "@/components/blocks/links";

type tLanguage = {
  flag: string;
  label: string;
};

type tContinent = {
  label: string;
  countries: tCountry[];
};
type tCountry = {
  locale: string;
  direction: string;
  flag: string;
  label: string;
};

type tLanguages = {
  align?: "center" | "start" | "end";
};

export default function Languages({ align }: tLanguages) {
  const tLanguages = useTranslations("components.languages");

  const language: tLanguage = tLanguages.raw("default-value");
  const continents: tContinent[] = tLanguages.raw("continents");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between text-base">
          <div className="flex items-center gap-3">
            <span className="text-lg">{language.flag}</span>
            <p>{language.label}</p>
          </div>
          <IconSelector className="text-muted-foreground/80 size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="p-0">
        <Command>
          <CommandInput placeholder={tLanguages("placeholder")} />
          <CommandList>
            <CommandEmpty>{tLanguages("empty")}</CommandEmpty>
            {continents.map((continent) => (
              <CommandGroup key={continent.label} heading={continent.label}>
                {continent.countries
                  .filter((country) => country.label !== language.label)
                  .map((country) => (
                    <CommandItem
                      asChild
                      key={country.label}
                      value={country.label}
                      className="cursor-pointer gap-3"
                    >
                      <LinkLocale locale={country.locale}>
                        <span className="text-lg leading-none">
                          {country.flag}
                        </span>
                        <span dir={country.direction} className="line-clamp-1">
                          {country.label}
                        </span>
                      </LinkLocale>
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
