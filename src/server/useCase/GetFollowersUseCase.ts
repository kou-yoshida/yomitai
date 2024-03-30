import { ListDto } from "../domain/dto/ListDto";
import { Follower } from "../domain/entities/Follower";
import { Pagination } from "../domain/entities/Pagination";
import { User } from "../domain/entities/User";
import { GetFollowersRepository } from "../domain/repositories/GetFollowersRepository";

export class GetFollowersUseCase {
  constructor(private repository: GetFollowersRepository) {}

  async execute(user: User, pagination: Pagination) {
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
