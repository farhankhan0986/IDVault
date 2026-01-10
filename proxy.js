import { NextResponse } from "next/server";

export function proxy(req) {
  const { pathname } = req.nextUrl;

  // ✅ Public routes (no auth required)
  if (
    pathname === "/" ||
    pathname.startsWith("/card/") ||
    pathname.startsWith("/api/cards/public") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return NextResponse.next();
  }

  // ✅ Protected routes
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
