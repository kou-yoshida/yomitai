import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/auth";

export async function GET(req: NextRequest) {
  const message = req.nextUrl.searchParams.get("message") || "null!!";

  const session = await auth();

  return NextResponse.json(new Date() + message);
}
