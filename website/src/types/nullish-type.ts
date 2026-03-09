import { UndefinableType } from "./undefinable-type";
import { NullableType } from "./nullable-type";

type NullishType<tType> = UndefinableType<tType> | NullableType<tType>;

export type { NullishType };
