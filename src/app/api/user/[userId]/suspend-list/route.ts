import { auth } from "@/src/auth";
import { GetSuspendedTodoListRepositoryImpl } from "@/src/server/repositories/GetSuspendedTodoListRepositoryImpl";
import { GetSuspendedTodoListUseCase } from "@/src/server/useCase/GetSuspendedTodoListUseCase";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Pagination } from "@/src/server/domain/entities/Pagination";
import { validate } from "@/src/lib/validate";
import { getSuspendedTodoListByUserIdParamsSchema } from "./_validationSchema";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const pageParam = query.get("page");
    const limitParam = query.get("limit");

    const { tagIds, page, limit, userId } = await validate(
      getSuspendedTodoListByUserIdParamsSchema,
      {
        ...(await req.json()),
        limit: limitParam,
        page: pageParam,
      }
    );

    const pagination = new Pagination(page, limit);

    const useCase = new GetSuspendedTodoListUseCase(
      new GetSuspendedTodoListRepositoryImpl(prisma)
    );
    const suspendedTodoList = await useCase.execute({
      userId: userId,
      tagIds,
      pagination,
    });

    return NextResponse.json(suspendedTodoList);
  } catch (e) {
    return NextResponse.json(e);
  }
}
