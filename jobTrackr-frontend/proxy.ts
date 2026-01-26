// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;


  if (searchParams.has("_rsc")) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("jwt");
  console.log(req.cookies.getAll())

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
