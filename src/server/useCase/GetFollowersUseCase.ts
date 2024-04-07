import { Pagination } from "../domain/entities/Pagination";
import { User } from "../domain/entities/User";
import { GetFollowersRepository } from "../domain/repositories/GetFollowersRepository";

export class GetFollowersUseCase {
  constructor(private repository: GetFollowersRepository) {}

  async execute(user: User, pagination: Pagination, isLoginUser: boolean) {
    const { list: _list, amount } = await this.repository.execute(
      user,
      pagination
    );

    // ログインユーザーではなく、ユーザーが非公開の場合は空配列を返す
    const list = !isLoginUser || user.isPrivate() ? [] : _list;

    return {
      list,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        amount,
      },
    };
  }
}
