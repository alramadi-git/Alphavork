import z from "zod";

import { refreshTokenValidator } from "./refresh-token-validator";

const logoutCredentialsValidator = z
  .object({
    refreshToken: refreshTokenValidator,
  })
  .strict();
type logoutCredentialsInput = z.infer<typeof logoutCredentialsValidator>;

export type { logoutCredentialsInput };
export { logoutCredentialsValidator };
