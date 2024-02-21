import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const message = req.nextUrl.searchParams.get("message") || "null!!";
  return NextResponse.json(new Date() + message);
}
