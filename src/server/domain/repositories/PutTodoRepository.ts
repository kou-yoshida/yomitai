import { CompletedTodo } from "../entities/CompletedTodo";
import { SuspendedTodo } from "../entities/SuspendedTodo";

export interface PutTodoRepository {
  execute(
    todo: CompletedTodo | SuspendedTodo,
    tagIds: string[],
    notificationTargetIds: string[]
  ): Promise<CompletedTodo | SuspendedTodo>;
}
