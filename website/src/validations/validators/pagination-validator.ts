import z from "zod";

import { pageSizeEnum } from "../enums/page-size-enum";

const PAGE_MIN_VALUE = 1;

const zPagination = z
  .object({
    page: z
      .number("Page is required.")
      .min(PAGE_MIN_VALUE, `Page must be at least ${PAGE_MIN_VALUE}.`),
    pageSize: z.enum(pageSizeEnum, "Invalid page size."),
  })
  .strict();
type tPagination = z.infer<typeof zPagination>;

export type { tPagination };
export { zPagination };
