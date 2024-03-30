import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import {
  TodoStatus,
  TODO_STATUS,
} from "../domain/entities/constants/TodoStatus";
import { GetFollowersRepository } from "../domain/repositories/GetFollowersRepository";
import { PutTodoRepository } from "../domain/repositories/PutTodoRepository";
import { GetFollowersRepositoryImpl } from "../repositories/GetFollowersRepositoryImpl";
import { GetFollowersUseCase } from "./GetFollowersUseCase";

export class PutTodoUseCase {
  constructor(
    private putTodoRepository: PutTodoRepository,
    private getFollowersRepository: GetFollowersRepository
  ) {}

  async execute(
    createParams:
      | Parameters<typeof CompletedTodo.reconstruct>[0]
      | Parameters<typeof SuspendedTodo.reconstruct>[0],
    status: TodoStatus,
    tagIds: string[]
  ) {
    const { content, url, userId, id, createdAt, updatedAt } = createParams;

    const todo =
      status === TODO_STATUS.Completed
        ? CompletedTodo.reconstruct({
            content,
            url,
            userId,
            id,
            createdAt,
            updatedAt,
          })
        : SuspendedTodo.reconstruct({
            content,
            url,
            userId,
            id,
            createdAt,
            updatedAt,
          });

    const getFollowersUseCase = new GetFollowersUseCase(
      this.getFollowersRepository
    );

    const followers = await getFollowersUseCase.execute(userId);

    // 通知を行うユーザー配列を取得(userIdのフォロワーのid配列を取得)
    return await this.repository.execute(todo, tagIds);
  }
}
