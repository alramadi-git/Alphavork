import z from "zod";

const OTP_FIXED_LENGTH = 8;

const otpValidator = z
  .string("OTP is required.")
  .length(OTP_FIXED_LENGTH, "OTP is not valid.")
  .regex(/^[a-zA-Z0-9+/=]+$/, "OTP is not valid.");
type otpInput = z.infer<typeof otpValidator>;

export type { otpInput };
export { otpValidator };
