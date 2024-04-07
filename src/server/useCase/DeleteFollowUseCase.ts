import { User } from "../domain/entities/User";
import { DeleteFollowRepository } from "../domain/repositories/DeleteFollowRepository";

export class DeleteFollowUseCase {
  constructor(private _repository: DeleteFollowRepository) {}
  async execute(user: User, UserId: string) {
    await this._repository.execute(user, UserId);
  }
}
