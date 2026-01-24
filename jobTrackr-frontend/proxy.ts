// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // Forward the cookies
  const cookie = req.headers.get("cookie");

  const res = await fetch("https://jobtrackr-production.up.railway.app/api/v1/auth/refresh", {
    method: "POST",
    headers: {
      "cookie": cookie || "",
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ important
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*"],
};
