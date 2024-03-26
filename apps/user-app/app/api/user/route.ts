import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return Response.json({ name: "ankit", id: 1234 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ name: body.name });
}
