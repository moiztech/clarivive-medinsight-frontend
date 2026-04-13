import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of routes that require authentication
const protectedRoutes = [
  "/checkout",
  "/dashboard",
  "/company",
  "/orders",
];

/**
 * Next.js Middleware
 * Handles route protection and authentication redirects
 */
export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("access_token")?.value ||
    request.cookies.get("refresh_token")?.value;
  // const companyToken = request.cookies.get("company_token")?.value;
  const { pathname, search } = request.nextUrl;

  // 1. If user is trying to access a protected route and has no token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      if (pathname.startsWith("/checkout")) {
        const loginUrl = new URL("/login", request.url);
        const callBackUrl = request.nextUrl.searchParams.get("callBackUrl");
        loginUrl.searchParams.set("callbackUrl", callBackUrl || pathname);
        return NextResponse.redirect(loginUrl);
      } else {
        const loginUrl = new URL("/login", request.url);
        // Store the destination to redirect back after login
        loginUrl.searchParams.set("callbackUrl", pathname + search);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

// Matching Paths
export const config = {
  matcher: [
    "/checkout/:path*",
    "/dashboard/:path*",
    "/orders/:path*",
    "/orders",
    "/login",
    "/signup",
    "/company/:path*",
  ],
};
