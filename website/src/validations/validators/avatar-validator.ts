import z from "zod";

import { sizeUnitEnum } from "@/validations/enums/size-unit-enum";

const AVATAR_MAX_SIZE = 300;
const AVATAR_MAX_BYTES_SIZE = sizeUnitEnum.kb * AVATAR_MAX_SIZE;

const AVATAR_ALLOWED_TYPES = ["image/jpeg", "image/png"];

const avatarValidator = z
  .file("Avatar is required.")
  .max(AVATAR_MAX_BYTES_SIZE, `Avatar must be less than ${AVATAR_MAX_SIZE} KB.`)
  .mime(AVATAR_ALLOWED_TYPES, "Avatar must be an image.");
type avatarInput = z.infer<typeof avatarValidator>;

export type { avatarInput };
export { avatarValidator };
