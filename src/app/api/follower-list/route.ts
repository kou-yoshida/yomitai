import { auth } from "@/src/auth";
import { GetFollowersRepositoryImpl } from "@/src/server/repositories/GetFollowersRepositoryImpl";
import { GetFollowersUseCase } from "@/src/server/useCase/GetFollowersUseCase";
import { prisma } from "@/src/lib/prisma";
import { validate } from "@/src/lib/validate";
import { getFollowersParamsSchema } from "./_validationSchema";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await auth();
    const { page, limit } = await validate(
      getFollowersParamsSchema,
      await req.json()
    );

    const useCase = new GetFollowersUseCase(
      new GetFollowersRepositoryImpl(prisma)
    );

    const { list, pagination } = await useCase.execute(
      user,
      new Pagination(page, limit),
      true
    );

    return NextResponse.json({
      result: {
        list: list.map((follower) => follower.toObject()),
        pagination,
      },
    });
  } catch (e) {
    return NextResponse.json(e);
  }
}
