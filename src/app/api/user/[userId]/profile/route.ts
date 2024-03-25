import { validate } from "@/src/lib/validate";
import { getProfileByUserIdParamsSchema } from "./_validationSchema";
import { GetProfileUseCase } from "@/src/server/useCase/GetProfileUseCase";
import { GetProfileRepositoryImpl } from "@/src/server/repositories/GetProfileRepositoryImpl";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = await validate(getProfileByUserIdParamsSchema, req);

    const useCase = new GetProfileUseCase(new GetProfileRepositoryImpl(prisma));
    const profile = (await useCase.execute(userId))?.toObject();

    return NextResponse.json({ profile });
  } catch (e) {
    return NextResponse.json(e);
  }
}
