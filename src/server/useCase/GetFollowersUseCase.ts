import { Pagination } from "../domain/entities/Pagination";
import { User } from "../domain/entities/User";
import { GetFollowersRepository } from "../domain/repositories/GetFollowersRepository";

export class GetFollowersUseCase {
  constructor(private repository: GetFollowersRepository) {}

  async execute(user: User, pagination: Pagination, isLoginUser: boolean) {
    // ログインユーザーではなく、ユーザーが非公開の場合は空配列を返す
    if (!isLoginUser && user.isPrivate())
      return { list: [], pagination: { page: 0, limit: 0, amount: 0 } };
    const { list, amount } = await this.repository.execute(user, pagination);

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
