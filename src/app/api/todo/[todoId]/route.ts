import { auth } from "@/src/auth";
import { GetTodoDetailRepositoryImpl } from "@/src/server/repositories/GetTodoDetailRepositoryImpl";
import { GetTodoDetailUseCase } from "@/src/server/useCase/GetTodoDetailUseCase";
import { prisma } from "@/src/lib/prisma";
import {
  getTodoDetailRequestSchema,
  postTodoRequestSchema,
  putTodoRequestSchema,
} from "./_validationSchema";
import { validate } from "@/src/lib/validate";
import { NextResponse } from "next/server";
import { CompletedTodo } from "@/src/server/domain/entities/CompletedTodo";
import { PostTodoUseCase } from "@/src/server/useCase/PostTodoUseCase";
import { PostTodoRepositoryImpl } from "@/src/server/repositories/PostTodoRepositoryImpl";
import { TODO_STATUS } from "@/src/server/domain/entities/constants/TodoStatus";
import { PutTodoUseCase } from "@/src/server/useCase/PutTodoUseCase";
import { PutTodoRepositoryImpl } from "@/src/server/repositories/PutTodoRepositoryImpl";
import { DeleteTodoUseCase } from "@/src/server/useCase/DeleteTodoUseCase";
import { DeleteTodoRepositoryImpl } from "@/src/server/repositories/DeleteTodoRepositoryImpl";
import { GetFollowersRepositoryImpl } from "@/src/server/repositories/GetFollowersRepositoryImpl";

export async function GET(req: Request) {
  try {
    const { todoId } = await validate(
      getTodoDetailRequestSchema,
      await req.json()
    );
    const user = await auth();

    const useCase = new GetTodoDetailUseCase(
      new GetTodoDetailRepositoryImpl(prisma)
    );

    const todo = await useCase.execute({ todoId, user, isLoginUser: true });

    return NextResponse.json({ todo });
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function POST(req: Request) {
  try {
    const { url, content, tagIds } = await validate(
      postTodoRequestSchema,
      await req.json()
    );
    const user = await auth();

    const useCase = new PostTodoUseCase(
      new PostTodoRepositoryImpl(prisma),
      new GetFollowersRepositoryImpl(prisma)
    );
    const todo = await useCase.execute(
      { url, content, userId: user.id },
      TODO_STATUS.Suspended,
      tagIds,
      user
    );

    return NextResponse.json({ todo });
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function PUT(req: Request) {
  try {
    const {
      url,
      content,
      tagIds,
      status,
      todoId,
      createdAt: createdAtIsoString,
      updatedAt: updatedAtIosString,
    } = await validate(putTodoRequestSchema, await req.json());

    const user = await auth();

    const useCase = new PutTodoUseCase(
      new PutTodoRepositoryImpl(prisma),
      new GetFollowersRepositoryImpl(prisma)
    );

    const createdAt = new Date(createdAtIsoString);
    const updatedAt = new Date(updatedAtIosString);

    const todo = await useCase.execute(
      { url, content, userId: user.id, id: todoId, createdAt, updatedAt },
      status,
      tagIds,
      user
    );

    return NextResponse.json({ todo });
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function DELETE(req: Request) {
  try {
    const { todoId } = await validate(
      getTodoDetailRequestSchema,
      await req.json()
    );
    const user = await auth();

    const useCase = new DeleteTodoUseCase(new DeleteTodoRepositoryImpl(prisma));

    await useCase.execute(todoId, user);

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json(e);
  }
}
