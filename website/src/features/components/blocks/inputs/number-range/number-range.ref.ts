import { NumberRangeType } from "./types/number-range.type";

export type NumberRangeRef = {
  setValue(value: NumberRangeType): void;
  reset(defaultValue?: NumberRangeType): void;
};
