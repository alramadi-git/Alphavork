import z from "zod";

import { isValidPhoneNumber } from "libphonenumber-js";

const phoneNumberValidator = z
  .string("Phone number is required.")
  .refine((value) => isValidPhoneNumber(value), "Phone number is not valid.");
type phoneNumberInput = z.infer<typeof phoneNumberValidator>;

export type { phoneNumberInput };
export { phoneNumberValidator };
