import { User } from "../domain/entities/User";
import { DeleteTagRepository } from "../domain/repositories/DeleteTagRepository";

export class DeleteTagUseCase {
  constructor(private deleteTagRepository: DeleteTagRepository) {}

  async execute(user: User, tagId: string) {
    await this.deleteTagRepository.execute(user, tagId);
  }
}
