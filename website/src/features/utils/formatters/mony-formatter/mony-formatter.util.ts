import { LocaleEnum } from "@/features/i18n/enums/locale.enum";
import { CurrencyEnum } from "./enums/currency.enum";

export class MonyFormatterUtil {
  private readonly _locale: LocaleEnum;
  private readonly _currency: CurrencyEnum;

  private readonly _formatter: Intl.NumberFormat;

  constructor(locale: LocaleEnum, currency: CurrencyEnum) {
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
