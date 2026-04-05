import { UndefinableType } from "@/common/types/undefinable.type";

export type NumberRef = {
  setValue(value: UndefinableType<number>): void;
  reset(defaultValue?: number): void;
};
