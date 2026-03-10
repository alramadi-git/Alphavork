import { localeEnum } from "@/features/i18n/enums/locale";
import { currencyEnum } from "../enums/currency-enum";

class MonyFormatterLibrary {
  private readonly _formatter: Intl.NumberFormat;

  private readonly _locale: localeEnum;
  private readonly _currency: currencyEnum;

  constructor(locale: localeEnum, currency: currencyEnum) {
    this._locale = locale;
    this._currency = currency;

    this._formatter = new Intl.NumberFormat(this._locale, {
      style: "currency",
      currency: this._currency,
    });
  }

  format(value: number): string {
    return this._formatter.format(value);
  }
}

export { MonyFormatterLibrary };
