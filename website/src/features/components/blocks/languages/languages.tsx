"use client";

import { useTranslations } from "next-intl";

import { IconCheck } from "@tabler/icons-react";

import { CountryType } from "./types/country.type";
import { ContinentType } from "./types/continent.type";

import { continents } from "./constants/continents";

import { SingleSearchableSelectField } from "../fields/selects/single-searchable-select/single-searchable-select.field";
import { LocaleLink } from "../links/locale-link/locale-link";

export default function Languages() {
  const tLanguages = useTranslations("components.languages");

  const defaultValue: CountryType = tLanguages.raw("data.default-value");

  return (
    <SingleSearchableSelectField<ContinentType, CountryType>
      defaultValue={defaultValue}
      search={{
        placeholder: tLanguages("ui.placeholder"),
        noMatch: tLanguages("ui.when-no-match"),
      }}
      groups={continents}
      render={(option) => (
        <div className="flex min-w-46 items-center gap-3">
          <span className="text-lg leading-none">{option.flag}</span>
          <span dir={option.direction} className="line-clamp-1">
            {option.label}
          </span>
        </div>
      )}
      renderOption={(option, isSelected) => (
        <LocaleLink locale={option.locale}>
          <span className="text-lg leading-none">{option.flag}</span>
          <span dir={option.direction} className="line-clamp-1">
            {option.label}
          </span>
          {isSelected && <IconCheck className="size-4" />}
        </LocaleLink>
      )}
    />
  );
}
