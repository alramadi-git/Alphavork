import z from "zod";

import { emailValidator } from "./email-validator";
import { passwordValidator } from "./password-validator";

const loginCredentialsValidator = z
  .object({
    email: emailValidator,
    password: passwordValidator,
    rememberMe: z.boolean("Remember me is required."),
  })
  .strict();
type loginCredentialsInput = z.infer<typeof loginCredentialsValidator>;

export type { loginCredentialsInput };
export { loginCredentialsValidator };
