import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { Pagination } from "../domain/entities/Pagination";
import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import { User } from "../domain/entities/User";
import {
  TodoStatus,
  TODO_STATUS,
} from "../domain/entities/constants/TodoStatus";
import { GetFollowersRepository } from "../domain/repositories/GetFollowersRepository";
import { PostTodoRepository } from "../domain/repositories/PostTodoRepository";
import { GetFollowersUseCase } from "./GetFollowersUseCase";

export class PostTodoUseCase {
  constructor(
    private postTodoRepository: PostTodoRepository,
    private getFollowersRepository: GetFollowersRepository
  ) {}

  async execute(
    createParams:
      | Parameters<typeof CompletedTodo.create>[0]
      | Parameters<typeof SuspendedTodo.create>[0],
    status: TodoStatus,
    tagIds: string[],
    user: User
  ) {
    const { content, url, userId } = createParams;

    const todo =
      status === TODO_STATUS.Completed
        ? CompletedTodo.create({ content, url, userId })
        : SuspendedTodo.create({ content, url, userId });

    const getFollowersUseCase = new GetFollowersUseCase(
      this.getFollowersRepository
    );

    // FIXME: 1000人以上のフォロワーは考慮しないが、直したい
    const { list } = await getFollowersUseCase.execute(
      user,
      new Pagination(1, 1000),
      true
    );

    return await this.postTodoRepository.execute(
      todo,
      tagIds,
      list.map((followers) => followers.toObject().userId)
    );
  }
}
