import { NextRequest, NextResponse } from "next/server";

import unauthenticatedMiddleware from "./unauthenticated";

export default function userMiddleware(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/", 6)) return NextResponse.next();

  const middlewares = unauthenticatedMiddleware(request);
  if (!middlewares?.ok) return middlewares;

  return NextResponse.next();
}
