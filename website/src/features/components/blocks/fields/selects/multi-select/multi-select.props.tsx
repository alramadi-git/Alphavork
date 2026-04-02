import { ReactElement, ReactNode } from "react";

import { GroupType } from "../types/group.type";
import { OptionType } from "../types/option.type";

export type MultiSelectProps<
  TGroup extends GroupType<TOption>,
  TOption extends OptionType,
> = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  maxShownOptions?: number;
  placeholder?: string;
  defaultValues?: TOption[];
  groups: TGroup[];
  render?: (group: TGroup) => ReactNode;
  renderOption?: (
    option: TOption,
    isSelected: boolean,
  ) => ReactElement<"button">;
  onToggle?: (values: TOption[]) => void;
};
