import { auth } from "@/src/auth";
import { GetSuspendedTodoListRepositoryImpl } from "@/src/server/repositories/GetSuspendedTodoListRepositoryImpl";
import { GetSuspendedTodoListUseCase } from "@/src/server/useCase/GetSuspendedTodoListUseCase";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { validate } from "@/src/lib/validate";
import { getFollowingTimelineParamsSchema } from "./_validationSchema";
import { GetTimeLineUseCase } from "@/src/server/useCase/GetTimelineUseCase";
import { GetTimeLineRepositoryImpl } from "@/src/server/repositories/GetTimeLineRepositoryImpl";
import { GetFollowingTimelineUseCase } from "@/src/server/useCase/GetFollowingTimeline";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const pageParam = query.get("page");
    const limitParam = query.get("limit");

    const [{ page, limit }, user] = await Promise.all([
      validate(getFollowingTimelineParamsSchema, {
        limit: limitParam,
        page: pageParam,
      }),
      auth(),
    ]);

    const pagination = new Pagination(page, limit);

    const useCase = new GetFollowingTimelineUseCase(
      new GetTimeLineRepositoryImpl(prisma)
    );
    const suspendedTodoList = await useCase.execute(pagination, user);

    return NextResponse.json(suspendedTodoList);
  } catch (e) {
    return NextResponse.json(e);
  }
}
