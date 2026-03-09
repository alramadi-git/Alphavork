import z from "zod";

import { accessTokenValidator } from "../validators/access-token-validator";

type accessTokenInput = z.infer<typeof accessTokenValidator>;

export type { accessTokenInput };
