import { OptionType } from "../types/option.type";

export type MultiSelectRef<TOption extends OptionType> = {
  setValue: (values: TOption[]) => void;
  reset: (defaultValues?: TOption[]) => void;
};
