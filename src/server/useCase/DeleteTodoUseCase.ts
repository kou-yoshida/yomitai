import { User } from "../domain/entities/User";
import { DeleteTodoRepository } from "../domain/repositories/DeleteRepository";

export class DeleteTodoUseCase {
  constructor(private repository: DeleteTodoRepository) {}

  async execute(todoId: string, user: User) {
    await this.repository.execute(todoId, user);
  }
}
