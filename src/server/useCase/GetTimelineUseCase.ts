import { PrismaClient } from "@prisma/client";
import { GetTimeLineRepository } from "../domain/repositories/GetTimeLineRepository";
import { Pagination } from "../domain/entities/Pagination";

export class GetTimeLineUseCase {
  constructor(private _repository: GetTimeLineRepository) {}

  async execute(pagination: Pagination) {
    return await this._repository.execute(pagination);
  }
}
