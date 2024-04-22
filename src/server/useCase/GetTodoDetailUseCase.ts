import { NotFoundError } from "@/src/errors/NotFountError";
import { User } from "../domain/entities/User";
import { GetTodoDetailRepository } from "../domain/repositories/GetTodoDetailRepository";

export class GetTodoDetailUseCase {
  constructor(private getTodoDetailRepository: GetTodoDetailRepository) {}

  async execute({
    todoId,
    user,
    isLoginUser,
  }: {
    todoId: string;
    user: User;
    isLoginUser: boolean;
  }) {
    if (!isLoginUser && user.isPrivate()) return;

    const todo = await this.getTodoDetailRepository.execute({
      todoId,
      userId: user.id,
    });
    if (!todo) throw new NotFoundError();
    return todo;
  }
}
