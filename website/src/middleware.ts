import { NextRequest, NextResponse } from "next/server";

import { nextIntlMiddleware } from "@/features/i18n/middlewares/next-intl.middleware";

export default function middleware(request: NextRequest): NextResponse {
  let middlewares = NextResponse.next();

  middlewares = nextIntlMiddleware(request);
  if (!middlewares.ok) return middlewares;

  return middlewares;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
