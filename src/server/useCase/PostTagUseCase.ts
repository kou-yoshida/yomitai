import { Tag } from "../domain/entities/Tag";
import { User } from "../domain/entities/User";
import { PostTagRepository } from "../domain/repositories/PostTagRepository";

export class PostTagUseCase {
  constructor(private postTagRepository: PostTagRepository) {}

  async execute(user: User, tag: Tag) {
    await this.postTagRepository.execute(user, tag);
  }
}
