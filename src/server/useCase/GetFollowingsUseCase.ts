import { Pagination } from "../domain/entities/Pagination";
import { User } from "../domain/entities/User";
import { GetFollowingsRepository } from "../domain/repositories/GetFollowingsRepository";

export class GetFollowingsUseCase {
  constructor(private _repository: GetFollowingsRepository) {}

  async execute(user: User, pagination: Pagination, isLoginUser: boolean) {
    const { list: _list, amount } = await this._repository.execute(
      user,
      pagination
    );

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
