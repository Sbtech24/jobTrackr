
import { NextRequest, NextResponse } from "next/server";


function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return true;
    }

    // Decode the payload (second part)
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    );

    // Check expiration time
    if (!payload.exp) {
      return true;
    }

    // Convert to milliseconds and compare with current time
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    return currentTime > expirationTime;
  } catch (error) {
    // If we can't decode the token, consider it expired
    return true;
  }
}

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

  // Check if token has expired
  if (isTokenExpired(token)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const response = NextResponse.redirect(url);
    // Clear the expired token cookie
    response.cookies.delete("jwt");
    return response;
  }

  // TODO: optionally verify the token by calling your API endpoint
  //  fetch user 
 
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
