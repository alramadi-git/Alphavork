import { NextRequest, NextResponse } from "next/server";

export default function unauthenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/authentication", 6)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("user-access-token")?.value;
  const refreshToken = request.cookies.get("user-refresh-token")?.value;
  const account = request.cookies.get("user-account")?.value;

  if (accessToken && refreshToken && account) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  return NextResponse.next();
}
