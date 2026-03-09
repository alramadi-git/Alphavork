import z from "zod";

const REFRESH_TOKEN_FIXED_LENGTH = 44;

const refreshTokenValidator = z
  .string("Refresh token is required.")
  .length(REFRESH_TOKEN_FIXED_LENGTH, "Refresh token is not valid.")
  .regex(/^[a-zA-Z0-9+/=]+$/, "Refresh token is not valid.");
type refreshTokenInput = z.infer<typeof refreshTokenValidator>;

export type { refreshTokenInput };
export { refreshTokenValidator };
