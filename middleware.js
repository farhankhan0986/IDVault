import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ 1. Explicitly allow public routes
  if (
    pathname.startsWith("/card/") ||      // public card pages
    pathname.startsWith("/api/cards/public") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/") && pathname === "/"
  ) {
    return NextResponse.next();
  }

  // ✅ 2. Only then check auth
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create-card/:path*",
    "/edit-card/:path*",
  ],
};
