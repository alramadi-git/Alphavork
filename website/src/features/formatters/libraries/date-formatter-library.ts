import { localeEnum } from "@/features/i18n/enums/locale";

class DateFormatterLibrary {
  private readonly _formatter: Intl.DateTimeFormat;

  private readonly _locale: localeEnum;

  constructor(locale: localeEnum) {
    this._locale = locale;

    this._formatter = new Intl.DateTimeFormat(this._locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  format(value: Date): string {
    return this._formatter.format(value);
  }
}

export { DateFormatterLibrary };
