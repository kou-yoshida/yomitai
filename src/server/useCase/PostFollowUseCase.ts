import { User } from "../domain/entities/User";
import { PostFollowRepository } from "../domain/repositories/PostFollowRepository";

export class PostFollowUseCase {
  constructor(private _repository: PostFollowRepository) {}

  async execute(user: User, targetUserId: string) {
    await this._repository.execute(user, targetUserId);
  }
}
