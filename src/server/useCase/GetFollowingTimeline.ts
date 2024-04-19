import { PrismaClient } from "@prisma/client";
import { GetTimeLineRepository } from "../domain/repositories/GetTimeLineRepository";
import { Pagination } from "../domain/entities/Pagination";
import { User } from "../domain/entities/User";

export class GetFollowingTimelineUseCase {
  constructor(private _repository: GetTimeLineRepository) {}

  async execute(pagination: Pagination, user: User) {
    return await this._repository.execute(pagination, user);
  }
}
