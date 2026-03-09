import z from "zod";

const emailValidator = z.email("Email address is not valid.");
type emailInput = z.infer<typeof emailValidator>;

export type { emailInput };
export { emailValidator };
