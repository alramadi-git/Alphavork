import z from "zod";

import { uuidValidator } from "./uuid-validator";
import { refreshTokenValidator } from "./refresh-token-validator";

const refreshTokensCredentialsValidator = z
  .object({
    uuid: uuidValidator,
    refreshToken: refreshTokenValidator,
  })
  .strict();
type refreshTokensCredentialsInput = z.infer<typeof refreshTokensCredentialsValidator>;

export type { refreshTokensCredentialsInput };
export { refreshTokensCredentialsValidator };
