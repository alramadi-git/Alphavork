import z from "zod";

const uuidValidator = z.uuid("Invalid Uuid.");
type uuidInput = z.infer<typeof uuidValidator>;

const uuidsValidator = uuidValidator.array();
type uuidsInput = z.infer<typeof uuidsValidator>;

export type { uuidInput, uuidsInput };
export { uuidValidator, uuidsValidator };
