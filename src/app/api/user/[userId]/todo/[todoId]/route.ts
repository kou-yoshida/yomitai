import { GetTodoDetailRepositoryImpl } from "@/src/server/repositories/GetTodoDetailRepositoryImpl";
import { GetTodoDetailUseCase } from "@/src/server/useCase/GetTodoDetailUseCase";
import { prisma } from "@/src/lib/prisma";
import { getTodoDetailByUserIdRequestSchema } from "./_validationSchema";
import { validate } from "@/src/lib/validate";
import { NextResponse } from "next/server";
import { GetUserUseCase } from "@/src/server/useCase/GetUserUseCase";
import { GetUserRepositoryImpl } from "@/src/server/repositories/GetUserRepositoryImpl";

export async function GET(
  req: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const { todoId } = await validate(
      getTodoDetailByUserIdRequestSchema,
      await req.json()
    );

    const getUserUseCase = new GetUserUseCase(
      new GetUserRepositoryImpl(prisma)
    );
    const user = await getUserUseCase.execute(userId);

    const getTodoUseCase = new GetTodoDetailUseCase(
      new GetTodoDetailRepositoryImpl(prisma)
    );
    const todo = await getTodoUseCase.execute({
      todoId,
      user,
      isLoginUser: true,
    });

    return NextResponse.json({ todo });
  } catch (e) {
    return NextResponse.json(e);
  }
}
