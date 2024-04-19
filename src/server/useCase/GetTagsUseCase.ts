import { Pagination } from "../domain/entities/Pagination";
import { User } from "../domain/entities/User";
import { GetTagsRepository } from "../domain/repositories/GetTagsRepository";

export class GetTagsUseCase {
  constructor(private _repository: GetTagsRepository) {}

  async execute(pagination: Pagination, user: User, isLoginUser: boolean) {
    // ログインユーザーではなく、ユーザーが非公開の場合は空配列を返す
    if (!isLoginUser && user.isPrivate()) return [];

    const { list, amount } = await this._repository.execute(pagination, user);

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
