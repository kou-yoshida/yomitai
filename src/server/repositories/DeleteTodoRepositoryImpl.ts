import { PrismaClient } from "@prisma/client";
import { DeleteTodoRepository } from "../domain/repositories/DeleteRepository";
import { User } from "../domain/entities/User";
import { TODO_STATUS } from "../domain/entities/constants/TodoStatus";

export class DeleteTodoRepositoryImpl implements DeleteTodoRepository {
  constructor(private orm: PrismaClient) {}

  async execute(todoId: string, user: User) {
    await this.orm.todo.update({
      where: { id: todoId, userId: user.id },
      data: {
        status: TODO_STATUS.Deleted,
      },
    });
  }
}
