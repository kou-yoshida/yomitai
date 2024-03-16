import { ProfilePutDto } from "../domain/dto/ProfilePutDto";
import { PutProfileRepository } from "../domain/repositories/PutProfileRepository";

export class PutProfileUseCase {
  constructor(private repository: PutProfileRepository) {}

  async execute(userId: string, params: ProfilePutDto) {
    return this.repository.execute(userId, params);
  }
}
