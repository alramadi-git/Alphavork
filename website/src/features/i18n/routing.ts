import { defineRouting } from "next-intl/routing";

import { LocaleEnum } from "./enums/locale.enum";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LocaleEnum),

  // Used when no locale matches
  defaultLocale: LocaleEnum.EnUs,
});
