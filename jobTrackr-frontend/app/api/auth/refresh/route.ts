import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const FALLBACK_BACKEND = "https://jobtrackr-production.up.railway.app";

export async function POST() {
  const backend = process.env.BACKEND_URL || FALLBACK_BACKEND;

  // IMPORTANT: no extra space in URL
  const refreshUrl = `${backend}/api/v1/auth/refresh`;

  // If your backend refresh needs the current token, forward it
const token = await cookies();
  const jwt = token.get("jwt")?.value

  const r = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    cache: "no-store",
  });

  // ✅ Don't assume JSON (prevents Unexpected EOF / "<" errors)
  const text = await r.text();

  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          message: "Refresh endpoint did not return JSON",
          status: r.status,
          preview: text.slice(0, 200),
        },
        { status: 500 }
      );
    }
  }

  if (!r.ok) {
    return NextResponse.json(
      data ?? { message: "Refresh failed (empty response)", status: r.status },
      { status: r.status }
    );
  }

  const refreshToken = data?.accessToken || data?.token;
  const res = NextResponse.json(data ?? { ok: true });

  if (token) {
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("jwt", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}