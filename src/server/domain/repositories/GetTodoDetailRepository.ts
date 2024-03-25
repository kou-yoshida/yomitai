import { CompletedTodo } from "../entities/CompletedTodo";
import { SuspendedTodo } from "../entities/SuspendedTodo";

export interface GetTodoDetailRepository {
  execute({
    userId,
    todoId,
  }: {
    userId: string;
    todoId: string;
  }): Promise<SuspendedTodo | CompletedTodo>;
}
