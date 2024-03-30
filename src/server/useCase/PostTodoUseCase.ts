import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import {
  TodoStatus,
  TODO_STATUS,
} from "../domain/entities/constants/TodoStatus";
import { PostTodoRepository } from "../domain/repositories/PostTodoRepository";

export class PostTodoUseCase {
  constructor(private repository: PostTodoRepository) {}

  async execute(
    createParams:
      | Parameters<typeof CompletedTodo.create>[0]
      | Parameters<typeof SuspendedTodo.create>[0],
    status: TodoStatus,
    tagIds: string[]
  ) {
    const { content, url, userId } = createParams;

    const todo =
      status === TODO_STATUS.Completed
        ? CompletedTodo.create({ content, url, userId })
        : SuspendedTodo.create({ content, url, userId });

    return await this.repository.execute(todo, tagIds);
  }
}
