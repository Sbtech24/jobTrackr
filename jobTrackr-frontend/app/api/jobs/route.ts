import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await cookies();
  const jwt = token.get("jwt")?.value
  if(!jwt) return NextResponse.json({message:"Unauthorized"},{status:401})

  const url = "https://jobtrackr-production.up.railway.app/api/v1"

   const r = await fetch(`${process.env.BACKEND_URL||url}/jobs`, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });

   const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}

export async function POST(request: Request) {
  const token = await cookies();
  const jwt = token.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const url = "https://jobtrackr-production.up.railway.app/api/v1";
  const backendUrl = process.env.BACKEND_URL || url;

  try {
    const body = await request.json();

    const r = await fetch(`${backendUrl}/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 500 }
    );
  }
}