import { defineRouting } from "next-intl/routing";

import { localeEnum } from "./enums/locale";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(localeEnum),

  // Used when no locale matches
  defaultLocale: localeEnum.enUS,
});
