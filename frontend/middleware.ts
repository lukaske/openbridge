import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "./src/router/routes";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > new Date(JSON.parse(currentUser).access_expiration).getTime())
  ) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    response.cookies.delete("currentUser");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    const response = NextResponse.redirect(new URL("/dashboard/my-api", request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response
  }
}