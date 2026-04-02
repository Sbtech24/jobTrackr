import { NextResponse } from "next/server";

export async function POST(){
  
  const url = "https://jobtrackr-production.up.railway.app/api/v1"
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL || url }/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data =  await r.json()
   if (!r.ok) {
    return NextResponse.json(data, { status: r.status });
  }

  const res  = NextResponse.json({ok:true})

  res.cookies.delete("jwt")
 return res


}