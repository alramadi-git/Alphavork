import { GroupType } from "../../selects/types/group.type";

import { CountryType } from "./country.type";

export type ContinentType = GroupType<CountryType>;
