import z from "zod";

import { zAvatar } from "@/validations/avatar";

import { zLocation } from "@/validations/location";

import { zUsername } from "@/validations/username";

import { zBirthday } from "@/validations/birthday";

import { zPhoneNumber } from "@/validations/phone-number";

import { zEmail } from "@/validations/email";
import { zPassword } from "@/validations/password";

const zRegisterCredentials = z
  .object({
    avatar: z.nullable(zAvatar),
    location: zLocation,
    username: zUsername,
    birthday: zBirthday,
    phoneNumber: zPhoneNumber,
    email: zEmail,
    password: zPassword,
    rememberMe: z.boolean("Remember me is required."),
  })
  .strict();
type tRegisterCredentials = z.infer<typeof zRegisterCredentials>;

export type { tRegisterCredentials };
export { zRegisterCredentials };
