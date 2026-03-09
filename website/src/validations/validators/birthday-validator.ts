import z from "zod";

const BIRTHDAY_MIN_AGE = 18;
const BIRTHDAY_MAX_AGE = 65;

const birthdayValidator = z
  .date("Birthday is required.")
  .refine((date) => {
    const today = new Date();

    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - BIRTHDAY_MIN_AGE);

    return date <= minDate;
  }, `You must be at least ${BIRTHDAY_MIN_AGE} years old.`)
  .refine((date) => {
    const today = new Date();

    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - BIRTHDAY_MAX_AGE);

    return date >= maxDate;
  }, `Age must not exceed ${BIRTHDAY_MAX_AGE} years.`);

type birthdayInput = z.infer<typeof birthdayValidator>;

export type { birthdayInput };
export { birthdayValidator };
