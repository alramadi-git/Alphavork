import { LocaleEnum } from "@/features/i18n/enums/locale.enum";

export class DateFormatterUtil {
  private readonly _locale: LocaleEnum;

  private readonly _formatter: Intl.DateTimeFormat;

  constructor(locale: LocaleEnum) {
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
