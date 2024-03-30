import { auth } from "@/src/auth";

export async function GET(_req: Request) {
  const user = await auth();
}
