import z from "zod";

const AUTH_TOKEN_FIXED_LENGTH = 44;

const authTokenValidator = z
  .string("Auth token is required.")
  .length(AUTH_TOKEN_FIXED_LENGTH, "Invalid auth token.")
  .regex(/^[a-zA-Z0-9+/=]+$/, "Invalid auth token.");
type authTokenInput = z.infer<typeof authTokenValidator>;

export type { authTokenInput };
export { authTokenValidator };
