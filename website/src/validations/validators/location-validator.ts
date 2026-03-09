import z from "zod";

const COUNTRY_MIN_LENGTH = 2;
const COUNTRY_MAX_LENGTH = 56;

const CITY_MIN_LENGTH = 2;
const CITY_MAX_LENGTH = 85;

const STREET_MIN_LENGTH = 3;
const STREET_MAX_LENGTH = 150;

const locationValidator = z
  .object({
    country: z
      .string("Country is required.")
      .trim()
      .min(COUNTRY_MIN_LENGTH, "Country must be at least 2 characters.")
      .max(COUNTRY_MAX_LENGTH, "Country must not exceed 56 characters."),
    city: z
      .string("City is required.")
      .trim()
      .min(CITY_MIN_LENGTH, "City must be at least 2 characters.")
      .max(CITY_MAX_LENGTH, "City must not exceed 85 characters."),
    street: z
      .string("Street is required.")
      .trim()
      .min(STREET_MIN_LENGTH, "Street must be at least 3 characters.")
      .max(STREET_MAX_LENGTH, "Street must not exceed 150 characters."),
  })
  .strict();
type locationInput = z.infer<typeof locationValidator>;

export type { locationInput };
export { locationValidator };
