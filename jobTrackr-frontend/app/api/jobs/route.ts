import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await cookies();
  const jwt = token.get("jwt")?.value
  if(!jwt) return NextResponse.json({mesage:"Unauthaurized"},{status:401})

  const url = "https://jobtrackr-production.up.railway.app/api/v1"

   const r = await fetch(`${process.env.BACKEND_URL||url}/jobs`, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });

   const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}