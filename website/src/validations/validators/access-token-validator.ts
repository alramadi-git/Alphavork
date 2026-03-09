import z from "zod";

const accessTokenValidator = z.jwt("Invalid access token.");

export { accessTokenValidator };
