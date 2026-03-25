import { UndefinableType } from "./undefinable.type";

import { NullableType } from "./nullable.type";

export type NullishType<tType> = UndefinableType<tType> | NullableType<tType>;
