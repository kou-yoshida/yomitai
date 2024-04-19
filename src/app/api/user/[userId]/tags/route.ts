import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { validate } from "@/src/lib/validate";
import { getTagsByUserIdParamsSchema } from "./_validationSchema";
import { GetTimeLineUseCase } from "@/src/server/useCase/GetTimelineUseCase";
import { GetTimeLineRepositoryImpl } from "@/src/server/repositories/GetTimeLineRepositoryImpl";
import { GetTagsUseCase } from "@/src/server/useCase/GetTagsUseCase";
import { GetTagsRepositoryImpl } from "@/src/server/repositories/GetTagsRepositoryImpl";
import { GetUserUseCase } from "@/src/server/useCase/GetUserUseCase";
import { GetUserRepositoryImpl } from "@/src/server/repositories/GetUserRepositoryImpl";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const pageParam = query.get("page");
    const limitParam = query.get("limit");
    const userIdParam = query.get("userId");

    const { page, limit, userId } = await validate(
      getTagsByUserIdParamsSchema,
      {
        userId: userIdParam,
        limit: limitParam,
        page: pageParam,
      }
    );
    const pagination = new Pagination(page, limit);

    const getUserUseCase = new GetUserUseCase(
      new GetUserRepositoryImpl(prisma)
    );
    const user = await getUserUseCase.execute(userId);

    const useCase = new GetTagsUseCase(new GetTagsRepositoryImpl(prisma));
    const suspendedTodoList = await useCase.execute(pagination, user, false);

    return NextResponse.json(suspendedTodoList);
  } catch (e) {
    return NextResponse.json(e);
  }
}
