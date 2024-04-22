import { CompletedTodo } from "../entities/CompletedTodo";
import { SuspendedTodo } from "../entities/SuspendedTodo";

export interface PostTodoRepository {
  execute(
    todo: CompletedTodo | SuspendedTodo,
    tagIds: string[],
    notificationTargetIds: string[]
  ): Promise<CompletedTodo | SuspendedTodo>;
}
