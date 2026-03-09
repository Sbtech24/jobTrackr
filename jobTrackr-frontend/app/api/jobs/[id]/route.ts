import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = await cookies();
  const jwt = token.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = "https://jobtrackr-production.up.railway.app/api/v1";
  const backendUrl = process.env.BACKEND_URL || url;

  try {
    const r = await fetch(`${backendUrl}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch job" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = await cookies();
  const jwt = token.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = "https://jobtrackr-production.up.railway.app/api/v1";
  const backendUrl = process.env.BACKEND_URL || url;

  try {
    const r = await fetch(`${backendUrl}/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete job" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = await cookies();
  const jwt = token.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = "https://jobtrackr-production.up.railway.app/api/v1";
  const backendUrl = process.env.BACKEND_URL || url;

  try {
    const body = await request.json();
  
    const r = await fetch(`${backendUrl}/jobs/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await r.json();
 

    
    return NextResponse.json(data, { status: r.status });
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to update job" },
      { status: 500 },
    );
  }
}
