import createMiddleware from "next-intl/middleware";
import { routing } from "@/features/i18n/routing";

const nextIntlMiddleware = createMiddleware(routing);

export default nextIntlMiddleware;
