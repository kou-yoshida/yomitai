import { auth } from "@/src/auth";
import { GetCompletedTodoListRepositoryImpl } from "@/src/server/repositories/GetCompletedTodoListRepositoryImpl";
import { GetCompletedTodoListUseCase } from "@/src/server/useCase/GetCompletedTodoListUseCase";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { validate } from "@/src/lib/validate";
import { getCompletedTodoListByUserIdParamsSchema } from "./_validationSchema";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const query = req.nextUrl.searchParams;
    const pageParam = query.get("page");
    const limitParam = query.get("limit");

    const { tagIds, page, limit } = await validate(
      getCompletedTodoListByUserIdParamsSchema,
      {
        ...(await req.json()),
        limit: limitParam,
        page: pageParam,
      }
    );

    const pagination = new Pagination(page, limit);

    const useCase = new GetCompletedTodoListUseCase(
      new GetCompletedTodoListRepositoryImpl(prisma)
    );
    const suspendedTodoList = await useCase.execute({
      userId,
      tagIds,
      pagination,
    });

    return NextResponse.json(suspendedTodoList);
  } catch (e) {
    return NextResponse.json(e);
  }
}
