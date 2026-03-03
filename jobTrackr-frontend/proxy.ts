
import { NextRequest, NextResponse } from "next/server";
import { UserProfile } from "./lib/api/user";

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Allow the RSC requests to pass through
  if (searchParams.has("_rsc")) {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  // read the cookie value (may be httpOnly)
  const token = req.cookies.get("jwt")?.value;
  // console.log("middleware token", token);

  if (!token) {
    // redirect unauthenticated users to login
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // TODO: optionally verify the token by decoding or calling your API endpoint
  //  fetch user 
 
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
