import { OptionType } from "./option.type";

export type GroupType<TOption extends OptionType> = {
  value: string;
  label: string;
  options: TOption[];
};
