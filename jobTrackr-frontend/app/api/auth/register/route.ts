import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
 
  const url = "https://jobtrackr-production.up.railway.app/"
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL || url }/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await r.json();

  if (!r.ok) {
    return NextResponse.json(data, { status: r.status });
  }

  // Backend should return a token in JSON: { token: "..." }
  const token = data.accessToken;

  const res = NextResponse.json({ ok: true });

  // res.cookies.set("jwt", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "lax", // now it's same-site because it's on your frontend domain
  //   path: "/",
  // });

  return res;
}