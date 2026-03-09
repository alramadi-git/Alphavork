import z from "zod";

import { authTokenValidator } from "./token-validator";

const loginByProviderCredentialsValidator = z
  .object({
    authToken: authTokenValidator,
  })
  .strict();
type loginByProviderCredentialsInput = z.infer<typeof loginByProviderCredentialsValidator>;

export type { loginByProviderCredentialsInput };
export { loginByProviderCredentialsValidator };
