import { UndefinableType } from "@/common/types/undefinable.type";

import { OptionType } from "../types/option.type";

export type SingleSearchableSelectRef<TOption extends OptionType> = {
  setValue: (value: UndefinableType<TOption>) => void;
  reset: (defaultValue?: TOption) => void;
};
