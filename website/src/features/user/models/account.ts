import { NullableType } from "@/types/nullish-type";

import { tImageModel } from "./image";
import { tLocationModel } from "./location";

type tAccountModel = {
  uuid: string;
  avatar: NullableType<tImageModel>;
  location: tLocationModel;
  username: string;
  birthday: Date;
  phoneNumber: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
};

export type { tAccountModel };
