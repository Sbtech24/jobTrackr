import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("BODY FROM FRONTEND:", body);

  const r = await fetch(
    "https://jobtrackr-production.up.railway.app/api/v1/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  // Read body only ONCE
  const text = await r.text();
  console.log("RAW BACKEND RESPONSE:", text);

  let data;
  try {
    data = JSON.parse(text); // parse JSON safely
  } catch {
    return NextResponse.json(
      { error: "Backend returned non-JSON", raw: text },
      { status: 500 }
    );
  }

  if (!r.ok) {
    return NextResponse.json(data, { status: r.status });
  }

  return NextResponse.json({ ok: true });
}