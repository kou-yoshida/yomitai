import { auth } from "@/src/auth";
import { GetFollowersRepositoryImpl } from "@/src/server/repositories/GetFollowersRepositoryImpl";
import { GetFollowersUseCase } from "@/src/server/useCase/GetFollowersUseCase";
import { prisma } from "@/src/lib/prisma";
import { validate } from "@/src/lib/validate";
import { getFollowingsParamsSchema } from "./_validationSchema";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { NextRequest, NextResponse } from "next/server";
import { GetFollowingsUseCase } from "@/src/server/useCase/GetFollowingsUseCase";
import { GetFollowingsRepositoryImpl } from "@/src/server/repositories/GetFollowingsRepositoryImpl";
import { GetUserUseCase } from "@/src/server/useCase/GetUserUseCase";
import { GetUserRepositoryImpl } from "@/src/server/repositories/GetUserRepositoryImpl";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;

    const { page, limit, userId } = await validate(getFollowingsParamsSchema, {
      page: query.get("page"),
      limit: query.get("limit"),
      userId: query.get("userId"),
    });

    const getUserUseCase = new GetUserUseCase(
      new GetUserRepositoryImpl(prisma)
    );
    const user = await getUserUseCase.execute(userId);

    const getFollowingsUseCase = new GetFollowingsUseCase(
      new GetFollowingsRepositoryImpl(prisma)
    );

    const { list, pagination } = await getFollowingsUseCase.execute(
      user,
      new Pagination(page, limit),
      false
    );

    return NextResponse.json({
      result: {
        list: list.map((following) => following.toObject()),
        pagination,
      },
    });
  } catch (e) {
    return NextResponse.json(e);
  }
}
