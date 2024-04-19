import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { validate } from "@/src/lib/validate";
import { getTimelineParamsSchema } from "./_validationSchema";
import { GetTimeLineUseCase } from "@/src/server/useCase/GetTimelineUseCase";
import { GetTimeLineRepositoryImpl } from "@/src/server/repositories/GetTimeLineRepositoryImpl";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const pageParam = query.get("page");
    const limitParam = query.get("limit");

    const { page, limit } = await validate(getTimelineParamsSchema, {
      limit: limitParam,
      page: pageParam,
    });

    const pagination = new Pagination(page, limit);

    const useCase = new GetTimeLineUseCase(
      new GetTimeLineRepositoryImpl(prisma)
    );
    const suspendedTodoList = await useCase.execute(pagination);

    return NextResponse.json(suspendedTodoList);
  } catch (e) {
    return NextResponse.json(e);
  }
}
