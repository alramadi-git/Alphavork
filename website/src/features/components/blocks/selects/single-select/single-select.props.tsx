import { ReactElement } from "react";

import { UndefinableType } from "@/common/types/undefinable.type";

import { GroupType } from "../types/group.type";
import { OptionType } from "../types/option.type";

export type SingleSelectProps<
  TGroup extends GroupType<TOption>,
  TOption extends OptionType,
> = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  defaultValue?: TOption;
  groups: TGroup[];
  render?: (option: TOption) => ReactElement<"span">;
  renderOption?: (
    option: TOption,
    isSelected: boolean,
  ) => ReactElement<"button">;
  onSelect?: (option: UndefinableType<TOption>) => void;
};
