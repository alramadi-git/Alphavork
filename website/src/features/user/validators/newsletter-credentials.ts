import z from "zod";

import { zEmail } from "@/validations/email";

const zNewsletterCredentials = z
  .object({
    email: zEmail,
  })
  .strict();
type tNewsletterCredentials = z.infer<typeof zNewsletterCredentials>;

export type { tNewsletterCredentials };
export { zNewsletterCredentials };
