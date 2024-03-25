import { auth } from "@/src/auth";
import { GetCompletedTodoListRepositoryImpl } from "@/src/server/repositories/GetCompletedTodoListRepositoryImpl";
import { GetCompletedTodoListUseCase } from "@/src/server/useCase/GetCompletedTodoListUseCase";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { validate } from "@/src/lib/validate";
import { getCompletedTodoListParamsSchema } from "./_validationSchema";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const pageParam = query.get("page");
    const limitParam = query.get("limit");

    const [
      {
        user: { id },
      },
      { tagIds, page, limit },
    ] = await Promise.all([
      auth(),
      validate(getCompletedTodoListParamsSchema, {
        ...(await req.json()),
        limit: limitParam,
        page: pageParam,
      }),
    ]);

    const pagination = new Pagination(page, limit);

    const useCase = new GetCompletedTodoListUseCase(
      new GetCompletedTodoListRepositoryImpl(prisma)
    );
    const suspendedTodoList = await useCase.execute({
      userId: id,
      tagIds,
      pagination,
    });

    return NextResponse.json(suspendedTodoList);
  } catch (e) {
    return NextResponse.json(e);
  }
}
