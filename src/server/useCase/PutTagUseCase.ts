import { Tag } from "../domain/entities/Tag";
import { User } from "../domain/entities/User";
import { PutTagRepository } from "../domain/repositories/PutTagRepository";

export class PutTagUseCase {
  constructor(private readonly putTagRepository: PutTagRepository) {}

  async execute(user: User, tag: Tag) {
    await this.putTagRepository.execute(user, tag);
  }
}
