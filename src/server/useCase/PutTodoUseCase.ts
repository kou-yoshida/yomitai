import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { Pagination } from "../domain/entities/Pagination";
import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import { User } from "../domain/entities/User";
import {
  TodoStatus,
  TODO_STATUS,
} from "../domain/entities/constants/TodoStatus";
import { GetFollowersRepository } from "../domain/repositories/GetFollowersRepository";
import { PutTodoRepository } from "../domain/repositories/PutTodoRepository";
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
    tagIds: string[],
    user: User
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

    // FIXME: 1000人以上のフォロワーは考慮しないが、直したい
    const { list } = await getFollowersUseCase.execute(
      user,
      new Pagination(1, 1000),
      true
    );

    // 通知を行うユーザー配列を取得(userIdのフォロワーのid配列を取得)
    return await this.putTodoRepository.execute(
      todo,
      tagIds,
      list.map((follower) => follower.toObject().userId)
    );
  }
}
