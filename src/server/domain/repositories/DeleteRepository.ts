import { User } from "../entities/User";

export interface DeleteTodoRepository {
  execute(todoId: string, user: User): Promise<void>;
}
