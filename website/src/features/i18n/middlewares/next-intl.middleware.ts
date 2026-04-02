import { routing } from "@/features/i18n/routing";
import createMiddleware from "next-intl/middleware";

export const nextIntlMiddleware = createMiddleware(routing);
