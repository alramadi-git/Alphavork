import z from "zod";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

const usernameValidator = z
  .string("Username is required.")
  .trim()
  .min(
    USERNAME_MIN_LENGTH,
    `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
  )
  .max(
    USERNAME_MAX_LENGTH,
    `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`,
  );
type usernameInput = z.infer<typeof usernameValidator>;

export type { usernameInput };
export { usernameValidator };
