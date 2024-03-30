import { NotFoundError } from "@/src/errors/NotFountError";
import { GetUserRepository } from "../domain/repositories/GetUserRepository";

export class GetUserUseCase {
  constructor(private getUserRepository: GetUserRepository) {}

  async execute(userId: string) {
    const user = await this.getUserRepository.execute(userId);
    if (!user) throw new NotFoundError();
    return user;
  }
}
