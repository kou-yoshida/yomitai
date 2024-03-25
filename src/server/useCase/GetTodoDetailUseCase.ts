import { GetTodoDetailRepository } from "../domain/repositories/GetTodoDetailRepository";

export class GetTodoDetailUseCase {
  constructor(private getTodoDetailRepository: GetTodoDetailRepository) {}

  async execute({
    userId,
    todoId,
    isMine,
  }: {
    userId: string;
    todoId: string;
    isMine: boolean;
  }) {
    if (isMine) return this.getTodoDetailRepository.execute({ userId, todoId });

    // ユーザーがprivateであればundefinedを返す
    // userEntity作ればかいつするのでは？
  }
}
