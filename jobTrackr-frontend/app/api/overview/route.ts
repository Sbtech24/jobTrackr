import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await cookies();
  const jwt = token?.get("jwt")?.value;
  
  if (!jwt)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const url = "https://jobtrackr-production.up.railway.app/api/v1";

  try {
    const response = await fetch(`${url}/overview`, {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    const data = await response.json();
  
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
