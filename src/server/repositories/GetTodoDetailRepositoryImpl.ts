import { PrismaClient } from "@prisma/client";
import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import { GetTodoDetailRepository } from "../domain/repositories/GetTodoDetailRepository";
import { NotFoundError } from "@/src/errors/NotFountError";
import {
  TODO_STATUS,
  TodoStatus,
} from "../domain/entities/constants/TodoStatus";
import { UnprocessableEntityError } from "@/src/errors/UnprocessableEntityError";

export class GetTodoDetailRepositoryImpl implements GetTodoDetailRepository {
  constructor(private orm: PrismaClient) {}
  async execute({
    userId,
    todoId,
  }: {
    userId: string;
    todoId: string;
  }): Promise<CompletedTodo | SuspendedTodo> {
    const todo = await this.orm.todo.findUnique({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) throw new NotFoundError();

    if (todo.status === TODO_STATUS.Completed) {
      return CompletedTodo.reconstruct({
        id: todo.id,
        url: todo.url,
        content: todo.content || undefined,
        userId: todo.userId,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });
    }

    if (todo.status === TODO_STATUS.Suspended) {
      return SuspendedTodo.reconstruct({
        id: todo.id,
        url: todo.url,
        content: todo.content || undefined,
        userId: todo.userId,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });
    }

    throw new UnprocessableEntityError(
      `Unexpected status: ${
        todo.status satisfies (typeof TODO_STATUS)["Deleted"]
      }`
    );
  }
}
