import z from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 32;

const passwordValidator = z
  .string("Password is required.")
  .trim()
  .min(PASSWORD_MIN_LENGTH, "Password does not meet the required criteria.")
  .max(PASSWORD_MAX_LENGTH, "Password does not meet the required criteria.")
  .regex(/[a-z]/, "Password does not meet the required criteria.")
  .regex(/[A-Z]/, "Password does not meet the required criteria.")
  .regex(/[0-9]/, "Password does not meet the required criteria.")
  .regex(/[^a-zA-Z0-9]/, "Password does not meet the required criteria.")
  .regex(/^\S+$/, "Password does not meet the required criteria.");
type passwordInput = z.infer<typeof passwordValidator>;

export type { passwordInput };
export { passwordValidator };
