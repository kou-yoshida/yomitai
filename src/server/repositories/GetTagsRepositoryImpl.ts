import { PrismaClient } from "@prisma/client";
import { ListDto } from "../domain/dto/ListDto";
import { Pagination } from "../domain/entities/Pagination";
import { Tag } from "../domain/entities/Tag";
import { User } from "../domain/entities/User";
import { GetTagsRepository } from "../domain/repositories/GetTagsRepository";

export class GetTagsRepositoryImpl implements GetTagsRepository {
  constructor(private _orm: PrismaClient) {}

  async execute(pagination: Pagination, user: User) {
    const [tags, amount] = await Promise.all([
      this._orm.tag.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: {
          userId: user.id,
        },
      }),
      this._orm.tag.count({
        where: {
          userId: user.id,
        },
      }),
    ]);

    return new ListDto(
      tags.map(({ id, name }) => {
        return Tag.reconstruct({ id, name });
      }),
      amount
    );
  }
}
