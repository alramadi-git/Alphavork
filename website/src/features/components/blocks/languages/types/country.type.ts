import { OptionType } from "../../selects/types/option.type";

export type CountryType = OptionType & {
  direction: string;
  locale: string;
  flag: string;
};
