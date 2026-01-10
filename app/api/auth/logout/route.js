import { NextResponse } from "next/server";

export async function POST(req) {
  const res = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return res;
}
